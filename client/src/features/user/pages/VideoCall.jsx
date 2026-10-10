import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  PhoneOff,
  SwitchCamera,
  ShieldCheck,
  ArrowLeft,
  User,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { endCall } from "../../../services/callsServices.js";
import profileTwo from "../../../assets/priya_profile.jpg";

export default function VideoCall() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user: currentUser, token } = useAuth();
  const callId = location.state?.callId || null;
  const otherUserId =
    location.state?.otherUserId ||
    location.state?.receiverId ||
    location.state?.callerId ||
    null;
  const otherUserName =
    location.state?.otherUserName ||
    location.state?.receiverName ||
    location.state?.callerName ||
    "Match";
  const otherUserAvatar =
    location.state?.otherUserAvatar ||
    location.state?.receiverAvatar ||
    location.state?.callerAvatar ||
    profileTwo;
  const callType = location.state?.callType || "video";
  const isCaller = location.state?.isCaller ?? true;

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const pcRef = useRef(null);
  const socketRef = useRef(null);
  const iceCandidatesQueue = useRef([]);
  const isAnsweringOffer = useRef(false);
  const fallbackAnimRef = useRef(null);

  const [callStatus, setCallStatus] = useState("initializing"); 
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(callType === "video");
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasRemoteVideo, setHasRemoteVideo] = useState(false);
  const [hasRealVideo, setHasRealVideo] = useState(false);
  const [hasRealAudio, setHasRealAudio] = useState(false);
  const [hardwareWarning, setHardwareWarning] = useState(null);


  const formatDuration = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };
  useEffect(() => {
    if (callStatus !== "connected") return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [callStatus]);
  const cleanupMediaAndPeer = useCallback(() => {
    if (fallbackAnimRef.current) {
      cancelAnimationFrame(fallbackAnimRef.current);
      fallbackAnimRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
  }, []);
  const createFallbackVideoStream = useCallback((name) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      let step = 0;
      const render = () => {
        step += 0.05;
        const grad = ctx.createLinearGradient(0, 0, 640, 480);
        grad.addColorStop(0, "#1F1D2B");
        grad.addColorStop(1, "#121016");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 640, 480);

        // Animated pulse ring
        const pulse = Math.sin(step) * 10;
        const radius = 55 + pulse;
        ctx.beginPath();
        ctx.arc(320, 210, radius + 20, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 45, 114, 0.15)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(320, 210, radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 45, 114, 0.35)";
        ctx.fill();

        // Central avatar circle
        ctx.beginPath();
        ctx.arc(320, 210, 50, 0, Math.PI * 2);
        ctx.fillStyle = "#FF2D72";
        ctx.fill();

        // User Icon (Head & Shoulders Silhouette)
        ctx.save();
        ctx.fillStyle = "#FFFFFF";
        // Head
        ctx.beginPath();
        ctx.arc(320, 196, 15, 0, Math.PI * 2);
        ctx.fill();

        // Shoulders / Torso
        ctx.beginPath();
        ctx.arc(320, 240, 26, Math.PI * 1.15, Math.PI * 1.85, false);
        ctx.fill();
        ctx.restore();

        ctx.font = "bold 20px sans-serif";
        ctx.fillText(name || "You", 320, 300);
        ctx.font = "normal 14px sans-serif";
        ctx.fillStyle = "#94A3B8";
        ctx.fillText("Simulated Video Feed", 320, 328);
        fallbackAnimRef.current = requestAnimationFrame(render);
      };

      render();
      return canvas.captureStream ? canvas.captureStream(25) : null;
    } catch (e) {
      console.warn("Canvas stream fallback creation error:", e);
      return null;
    }
  }, []);
  const createSilentAudioTrack = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const dst = ctx.createMediaStreamDestination();
      const gain = ctx.createGain();
      gain.gain.value = 0.0001;
      osc.connect(gain);
      gain.connect(dst);
      osc.start();
      return dst.stream.getAudioTracks()[0] || null;
    } catch (e) {
      console.warn("Silent audio track fallback error:", e);
      return null;
    }
  }, []);

  const acquireMediaStream = useCallback(async () => {
    let videoTrack = null;
    let audioTrack = null;
    let warningMessage = null;

    const hasMedia = typeof navigator !== "undefined" && !!navigator.mediaDevices?.getUserMedia;

    if (!hasMedia) {
      warningMessage = "Camera & Mic require HTTPS or localhost. If on mobile LAN, open via localhost.";
    } else {
      try {
        const combined = await navigator.mediaDevices.getUserMedia({
          video: callType === "video",
          audio: true,
        });
        videoTrack = combined.getVideoTracks()[0] || null;
        audioTrack = combined.getAudioTracks()[0] || null;
      } catch (err1) {
        console.warn("Combined getUserMedia error:", err1?.name, err1?.message);

        // 2. Try video independently
        if (callType === "video") {
          try {
            const vStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoTrack = vStream.getVideoTracks()[0] || null;
          } catch (vErr) {
            console.warn("Video getUserMedia error:", vErr?.name, vErr?.message);
            if (vErr.name === "NotFoundError" || vErr.name === "DevicesNotFoundError") {
              warningMessage = "No camera hardware detected. Plug in a webcam to enable live video.";
            } else if (vErr.name === "NotAllowedError") {
              warningMessage = "Camera permission was blocked in browser settings.";
            } else if (vErr.name === "NotReadableError") {
              warningMessage = "Camera is currently used by another app or tab.";
            }
          }
        }

        // 3. Try audio independently
        try {
          const aStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          audioTrack = aStream.getAudioTracks()[0] || null;
        } catch (aErr) {
          console.warn("Audio getUserMedia error:", aErr?.name, aErr?.message);
          if (!warningMessage) {
            if (aErr.name === "NotFoundError" || aErr.name === "DevicesNotFoundError") {
              warningMessage = "No microphone detected. Plug in earphones or a microphone.";
            } else if (aErr.name === "NotAllowedError") {
              warningMessage = "Microphone permission was blocked in browser settings.";
            }
          }
        }
      }
    }

    const realVideo = !!videoTrack;
    const realAudio = !!audioTrack;
    const finalStream = new MediaStream();

    if (videoTrack) {
      finalStream.addTrack(videoTrack);
    } else if (callType === "video") {
      const fallbackVideo = createFallbackVideoStream(currentUser?.name || "You");
      if (fallbackVideo && fallbackVideo.getVideoTracks()[0]) {
        finalStream.addTrack(fallbackVideo.getVideoTracks()[0]);
      }
    }

    if (audioTrack) {
      finalStream.addTrack(audioTrack);
    } else {
      // Generate active silent audio track for WebRTC negotiation
      const fallbackAudio = createSilentAudioTrack();
      if (fallbackAudio) {
        finalStream.addTrack(fallbackAudio);
      }
    }

    setHasRealVideo(realVideo);
    setHasRealAudio(realAudio);
    setIsCameraOn(callType === "video");
    setHardwareWarning(warningMessage);

    return {
      stream: finalStream,
      hasVideo: finalStream.getVideoTracks().length > 0,
      hasAudio: finalStream.getAudioTracks().length > 0,
    };
  }, [callType, currentUser?.name, createFallbackVideoStream, createSilentAudioTrack]);

  // Retry / re-detect hardware if camera/mic was plugged in during call
  const retryHardware = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) return;

      // Try video
      if (!hasRealVideo && callType === "video") {
        try {
          const vStream = await navigator.mediaDevices.getUserMedia({ video: true });
          const newVTrack = vStream.getVideoTracks()[0];
          if (newVTrack && localStreamRef.current) {
            const oldVTrack = localStreamRef.current.getVideoTracks()[0];
            if (oldVTrack) {
              localStreamRef.current.removeTrack(oldVTrack);
              oldVTrack.stop();
            }
            localStreamRef.current.addTrack(newVTrack);
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = localStreamRef.current;
            }
            if (pcRef.current) {
              const sender = pcRef.current.getSenders().find((s) => s.track?.kind === "video");
              if (sender) sender.replaceTrack(newVTrack);
            }
            setHasRealVideo(true);
            setIsCameraOn(true);
          }
        } catch (e) {
          console.warn("Retry video failed:", e);
        }
      }

      // Try audio
      if (!hasRealAudio) {
        try {
          const aStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const newATrack = aStream.getAudioTracks()[0];
          if (newATrack && localStreamRef.current) {
            const oldATrack = localStreamRef.current.getAudioTracks()[0];
            if (oldATrack) {
              localStreamRef.current.removeTrack(oldATrack);
              oldATrack.stop();
            }
            localStreamRef.current.addTrack(newATrack);
            if (pcRef.current) {
              const sender = pcRef.current.getSenders().find((s) => s.track?.kind === "audio");
              if (sender) sender.replaceTrack(newATrack);
            }
            setHasRealAudio(true);
            setIsMuted(false);
          }
        } catch (e) {
          console.warn("Retry audio failed:", e);
        }
      }

      setHardwareWarning(null);
    } catch (e) {
      console.warn("Retry hardware failed:", e);
    }
  };

  // Listen to physical device changes (e.g. webcam or headset plugged in)
  useEffect(() => {
    if (!navigator.mediaDevices?.addEventListener) return;
    const handleDeviceChange = () => {
      console.log("Device change detected, checking for newly plugged hardware...");
      retryHardware();
    };
    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);
    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", handleDeviceChange);
    };
  }, [hasRealVideo, hasRealAudio]);

  // Initialize WebRTC and Socket Connection
  useEffect(() => {
    let isMounted = true;

    const initCall = async () => {
      // 1. Acquire Media Stream (with hardware or fallback)
      const { stream } = await acquireMediaStream();

      if (!isMounted) {
        if (stream) stream.getTracks().forEach((t) => t.stop());
        return;
      }

      if (stream) {
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      }

      // 2. Setup RTCPeerConnection with Google STUN servers
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
          { urls: "stun:stun3.l.google.com:19302" },
          { urls: "stun:stun4.l.google.com:19302" },
        ],
      });
      pcRef.current = pc;

      // Add local media tracks to peer connection
      if (stream && stream.getTracks().length > 0) {
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });
      }

      // Ensure transceivers exist to reliably receive remote audio and video
      const transceivers = pc.getTransceivers();
      const hasAudioTransceiver = transceivers.some((t) => t.receiver.track?.kind === "audio");
      const hasVideoTransceiver = transceivers.some((t) => t.receiver.track?.kind === "video");

      if (!hasAudioTransceiver) {
        pc.addTransceiver("audio", { direction: "sendrecv" });
      }
      if (!hasVideoTransceiver) {
        pc.addTransceiver("video", { direction: "sendrecv" });
      }

      // Handle receiving remote tracks (Audio + Video)
      pc.ontrack = (event) => {
        console.log("WebRTC received remote track:", event.track.kind);

        if (!remoteStreamRef.current) {
          remoteStreamRef.current = new MediaStream();
        }
        if (!remoteStreamRef.current.getTracks().some((t) => t.id === event.track.id)) {
          remoteStreamRef.current.addTrack(event.track);
        }

        // Attach to remote video element
        if (remoteVideoRef.current && remoteVideoRef.current.srcObject !== remoteStreamRef.current) {
          remoteVideoRef.current.srcObject = remoteStreamRef.current;
        }
        if (remoteVideoRef.current) {
          remoteVideoRef.current.play().catch((e) => console.log("Remote video play note:", e?.message));
        }

        // Attach to dedicated remote audio element to ensure audio is never muted/paused
        if (remoteAudioRef.current && remoteAudioRef.current.srcObject !== remoteStreamRef.current) {
          remoteAudioRef.current.srcObject = remoteStreamRef.current;
        }
        if (remoteAudioRef.current) {
          remoteAudioRef.current.play().catch((e) => console.log("Remote audio play note:", e?.message));
        }

        if (event.track.kind === "video") {
          setHasRemoteVideo(true);
        }
        setCallStatus("connected");
      };

      // 3. Connect to Socket.IO server
      const apiUrl = import.meta.env.VITE_API_URL;
      const socketUrl =
        apiUrl && apiUrl.startsWith("http")
          ? apiUrl.replace(/\/api\/?$/, "")
          : window.location.origin;

      const socket = io(socketUrl, {
        auth: { token },
        transports: ["websocket", "polling"],
        reconnection: true,
      });
      socketRef.current = socket;

      // ICE candidates transmission
      pc.onicecandidate = (event) => {
        if (event.candidate && socket && otherUserId) {
          socket.emit("webrtc_ice_candidate", {
            target_user_id: otherUserId,
            candidate: event.candidate,
            call_id: callId,
          });
        }
      };

      // Handle remote ICE candidates
      socket.on("webrtc_ice_candidate", async (data) => {
        try {
          if (!data || !data.candidate) return;
          const candidate = new RTCIceCandidate(data.candidate);
          if (pc.remoteDescription && pc.remoteDescription.type) {
            await pc.addIceCandidate(candidate);
          } else {
            iceCandidatesQueue.current.push(candidate);
          }
        } catch (e) {
          console.warn("ICE candidate add warning:", e?.message);
        }
      });

      // Handle Remote Offer
      socket.on("webrtc_offer", async (data) => {
        if (!data || !data.sdp || isAnsweringOffer.current) return;
        isAnsweringOffer.current = true;
        try {
          if (pc.signalingState !== "stable") {
            await Promise.all([
              pc.setLocalDescription({ type: "rollback" }).catch(() => {}),
              pc.setRemoteDescription(new RTCSessionDescription(data.sdp)),
            ]);
          } else {
            await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
          }

          if (pc.signalingState === "have-remote-offer") {
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);

            socket.emit("webrtc_answer", {
              target_user_id: otherUserId,
              sdp: answer,
              call_id: callId,
            });
            setCallStatus("connected");
          }

          // Flush queued candidates
          while (iceCandidatesQueue.current.length > 0) {
            const cand = iceCandidatesQueue.current.shift();
            await pc.addIceCandidate(cand).catch(() => {});
          }
        } catch (e) {
          console.warn("Offer handling:", e?.message);
        } finally {
          isAnsweringOffer.current = false;
        }
      });

      // Handle Remote Answer
      socket.on("webrtc_answer", async (data) => {
        try {
          if (!data || !data.sdp) return;
          if (pc.signalingState === "have-local-offer") {
            await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
            setCallStatus("connected");

            // Flush queued candidates
            while (iceCandidatesQueue.current.length > 0) {
              const cand = iceCandidatesQueue.current.shift();
              await pc.addIceCandidate(cand).catch(() => {});
            }
          }
        } catch (e) {
          console.warn("Answer handling:", e?.message);
        }
      });

      // Handle Call Acceptance (For Caller)
      socket.on("call-accepted", async () => {
        try {
          setCallStatus("connected");
          if (pc.signalingState === "stable") {
            const offer = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            });
            await pc.setLocalDescription(offer);

            socket.emit("webrtc_offer", {
              target_user_id: otherUserId,
              sdp: offer,
              call_id: callId,
            });
          }
        } catch (e) {
          console.warn("Offer creation:", e?.message);
        }
      });

      // Handle Incoming Call while on page (Receiver side confirmation)
      socket.on("call-user", () => {
        if (!isCaller && socket && otherUserId) {
          socket.emit("accept-call", {
            call_id: callId,
            caller_id: otherUserId,
            receiver_id: currentUser?.id,
            call_type: callType,
            room_name: `call_room_${callId}`,
          });
          setCallStatus("connected");
        }
      });

      // Handle Call Rejection
      socket.on("call-rejected", () => {
        setCallStatus("declined");
        cleanupMediaAndPeer();
      });

      // Handle Call Ended by remote party
      socket.on("call-ended", () => {
        setCallStatus("ended");
        cleanupMediaAndPeer();
      });

      // 4. Initiate or Join Call
      const onSocketConnected = () => {
        if (isCaller) {
          setCallStatus("calling");
          socket.emit("call-user", {
            call_id: callId,
            caller_id: currentUser?.id,
            receiver_id: otherUserId,
            call_type: callType,
            caller_name: currentUser?.name || "Caller",
            caller_avatar: currentUser?.profile?.profile_picture || null,
            room_name: `call_room_${callId}`,
          });
        } else {
          socket.emit("accept-call", {
            call_id: callId,
            caller_id: otherUserId,
            receiver_id: currentUser?.id,
            call_type: callType,
            room_name: `call_room_${callId}`,
          });
          setCallStatus("connected");
        }
      };

      if (socket.connected) {
        onSocketConnected();
      } else {
        socket.on("connect", onSocketConnected);
      }
    };

    initCall();

    return () => {
      isMounted = false;
      cleanupMediaAndPeer();
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [callId, otherUserId, token, isCaller, callType, currentUser, acquireMediaStream, cleanupMediaAndPeer]);

  // Click handler to resume any browser-suppressed autoplay audio
  const handleInteraction = () => {
    if (remoteAudioRef.current && remoteAudioRef.current.paused) {
      remoteAudioRef.current.play().catch(() => {});
    }
    if (remoteVideoRef.current && remoteVideoRef.current.paused) {
      remoteVideoRef.current.play().catch(() => {});
    }
  };

  // Toggle Microphone Mute
  const handleToggleMute = async () => {
    if (!localStreamRef.current) return;

    if (!isMuted) {
      // Mute audio
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach((t) => {
        t.enabled = false;
      });
      setIsMuted(true);
      return;
    }

    // Unmute: if real mic track exists, enable it
    const currentAudioTrack = localStreamRef.current.getAudioTracks()[0];
    if (hasRealAudio && currentAudioTrack) {
      currentAudioTrack.enabled = true;
      setIsMuted(false);
      return;
    }

    // If real mic was missing, attempt to acquire now
    try {
      const aStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newATrack = aStream.getAudioTracks()[0];
      if (newATrack) {
        if (currentAudioTrack) {
          localStreamRef.current.removeTrack(currentAudioTrack);
          currentAudioTrack.stop();
        }
        localStreamRef.current.addTrack(newATrack);
        if (pcRef.current) {
          const sender = pcRef.current.getSenders().find((s) => s.track?.kind === "audio");
          if (sender) sender.replaceTrack(newATrack);
        }
        setHasRealAudio(true);
        setIsMuted(false);
        setHardwareWarning(null);
      }
    } catch (err) {
      console.warn("Could not activate microphone:", err);
      alert("Microphone could not be accessed: " + (err.message || err.name));
    }
  };

  // Toggle Camera On/Off
  const handleToggleCamera = async () => {
    if (!localStreamRef.current) return;

    if (isCameraOn) {
      // Turn camera off
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach((t) => {
        t.enabled = false;
      });
      setIsCameraOn(false);
      return;
    }

    // Turn camera on
    const currentVideoTrack = localStreamRef.current.getVideoTracks()[0];
    if (hasRealVideo && currentVideoTrack) {
      currentVideoTrack.enabled = true;
      setIsCameraOn(true);
      return;
    }

    // If real video was missing, attempt to acquire now
    try {
      const vStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const newVTrack = vStream.getVideoTracks()[0];
      if (newVTrack) {
        if (currentVideoTrack) {
          localStreamRef.current.removeTrack(currentVideoTrack);
          currentVideoTrack.stop();
        }
        localStreamRef.current.addTrack(newVTrack);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStreamRef.current;
        }
        if (pcRef.current) {
          const sender = pcRef.current.getSenders().find((s) => s.track?.kind === "video");
          if (sender) sender.replaceTrack(newVTrack);
        }
        setHasRealVideo(true);
        setIsCameraOn(true);
        setHardwareWarning(null);
      }
    } catch (err) {
      console.warn("Could not activate camera:", err);
      alert("Camera could not be accessed: " + (err.message || err.name));
    }
  };

  // Toggle Speaker Volume
  const handleToggleSpeaker = () => {
    const next = !isSpeakerOn;
    setIsSpeakerOn(next);
    if (remoteVideoRef.current) {
      remoteVideoRef.current.muted = !next;
    }
    if (remoteAudioRef.current) {
      remoteAudioRef.current.muted = !next;
    }
  };

  // End Call Handler
  const handleEndCall = async () => {
    try {
      if (callId) {
        await endCall({ call_id: callId });
      }
      if (socketRef.current && otherUserId) {
        socketRef.current.emit("end-call", {
          call_id: callId,
          other_user_id: otherUserId,
        });
      }
    } catch (e) {
      console.warn("End call API error:", e);
    } finally {
      cleanupMediaAndPeer();
      setCallStatus("ended");
    }
  };

  return (
    <main
      onClick={handleInteraction}
      className="relative h-screen w-full bg-[#17151A] overflow-hidden select-none text-white font-poppins"
    >
      {/* HARDWARE WARNING NOTIFICATION TOAST */}
      {hardwareWarning && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[92%] px-4 py-2.5 rounded-2xl bg-amber-500/90 text-white text-xs font-semibold shadow-2xl flex items-center justify-between gap-3 backdrop-blur-md animate-fadeIn border border-amber-400/40">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-white" />
            <span>{hardwareWarning}</span>
          </div>
          <button
            onClick={retryHardware}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-xl text-[11px] font-bold cursor-pointer transition-all flex items-center gap-1 shrink-0"
          >
            <RefreshCw className="w-3 h-3" /> Retry
          </button>
        </div>
      )}

      {/* DEDICATED REMOTE AUDIO ELEMENT (GUARANTEES AUDIO PLAYBACK) */}
      <audio ref={remoteAudioRef} autoPlay playsInline muted={!isSpeakerOn} />

      {/* REMOTE VIDEO FEED (FULL SCREEN BACKGROUND) */}
      <div className="absolute inset-0 z-0 bg-[#0F0E13] flex items-center justify-center">
        {/* Remote Video Stream Element */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          muted={!isSpeakerOn}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            hasRemoteVideo && callStatus === "connected"
              ? "opacity-100"
              : "opacity-0 absolute pointer-events-none"
          }`}
        />

        {/* Fallback Remote Avatar Display */}
        {(!hasRemoteVideo || callStatus !== "connected") && (
          <div className="flex flex-col items-center justify-center space-y-6 z-10 px-6 text-center">
            <div className="relative">
              {callStatus === "calling" && (
                <>
                  <div className="absolute -inset-4 rounded-full bg-pink-500/20 animate-ping" />
                  <div className="absolute -inset-8 rounded-full bg-pink-500/10 animate-pulse" />
                </>
              )}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#FF2D72]/80 shadow-2xl bg-slate-800">
                {otherUserAvatar ? (
                  <img
                    src={otherUserAvatar}
                    alt={`${otherUserName || "Call partner"} call profile avatar`}
                    width="176"
                    height="176"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#FF2D72] to-[#7C3AED]">
                    <User className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
                {otherUserName}
              </h1>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <p className="text-sm font-semibold text-slate-300">
                  {callStatus === "calling"
                    ? "Ringing..."
                    : callStatus === "declined"
                    ? "Call Declined"
                    : callStatus === "initializing"
                    ? "Connecting..."
                    : "Connecting stream..."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Soft cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70 pointer-events-none" />
      </div>

      {/* TOP HEADER OVERLAY */}
      <header className="relative z-20 px-6 pt-6 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer text-white"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black drop-shadow-md">
                {otherUserName}
              </h2>
              {callStatus === "connected" && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
              <span className="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md">
                {callStatus === "connected"
                  ? formatDuration(seconds)
                  : callStatus === "calling"
                  ? "Ringing"
                  : "Connecting"}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> End-to-End Encrypted
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* LOCAL CAMERA PREVIEW (PiP FLOATING CARD) */}
      <div className="absolute z-20 top-20 right-6 w-28 h-40 sm:w-36 sm:h-52 rounded-3xl overflow-hidden border-2 border-white/40 shadow-2xl bg-black">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transition-transform ${
            isFlipped ? "scale-x-1" : "scale-x-[-1]"
          } ${isCameraOn ? "block" : "hidden"}`}
        />
        {!isCameraOn && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white/50 text-[10px] p-2 text-center">
            <VideoOff className="w-6 h-6 mb-1 text-slate-400" />
            <span>Camera Off</span>
          </div>
        )}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[9px] font-bold">
          You
        </div>
      </div>

      {/* BOTTOM CALL CONTROLS DOCK */}
      <footer className="absolute z-20 bottom-8 inset-x-0 flex flex-col items-center gap-4 px-6">
        <div className="flex items-center gap-3 sm:gap-4 p-3 bg-black/50 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
          {/* MUTE MIC */}
          <button
            onClick={handleToggleMute}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isMuted
                ? "bg-[#EF4444] text-white shadow-lg"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
            title={isMuted ? "Unmute Mic" : "Mute Mic"}
          >
            {isMuted ? (
              <MicOff className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>

          {/* TOGGLE CAMERA */}
          <button
            onClick={handleToggleCamera}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              !isCameraOn
                ? "bg-[#EF4444] text-white shadow-lg"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
            title={isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
          >
            {isCameraOn ? (
              <Video className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <VideoOff className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>

          {/* FLIP / SWITCH CAMERA */}
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all cursor-pointer text-white"
            title="Mirror / Flip Camera"
          >
            <SwitchCamera className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* SPEAKER TOGGLE */}
          <button
            onClick={handleToggleSpeaker}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              !isSpeakerOn
                ? "bg-amber-500 text-white"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
            title={isSpeakerOn ? "Mute Speaker" : "Unmute Speaker"}
          >
            {isSpeakerOn ? (
              <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>

          {/* END CALL BUTTON */}
          <button
            onClick={handleEndCall}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#EF4444] hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="End Video Call"
          >
            <PhoneOff className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </footer>

      {/* CALL FINISHED / DECLINED SUMMARY MODAL */}
      {(callStatus === "ended" || callStatus === "declined") && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 text-center text-[#17151A] space-y-4 shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-[#FF2D72] shadow-md">
              <img
                src={otherUserAvatar}
                alt={`${otherUserName || "Call partner"} call summary avatar`}
                width="64"
                height="64"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-black">
                {callStatus === "declined" ? "Call Declined" : "Call Finished"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {callStatus === "declined"
                  ? `${otherUserName} was unavailable for this call.`
                  : `Duration: ${formatDuration(seconds)} with ${otherUserName}`}
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => navigate("/messages")}
                className="w-full py-3 rounded-2xl bg-[#FF2D72] hover:bg-[#E02663] text-white font-black text-xs shadow-md transition-all cursor-pointer"
              >
                Back to Messages
              </button>
              <button
                onClick={() => navigate("/discover")}
                className="w-full py-2.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-all cursor-pointer"
              >
                Discover More Matches
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
