import { Banners } from "../models/index.js";

export const createBanner = async (req, res) => {
  try {
    const {
      desktopImage,
      mobileImage,
      headline,
      tagline,
      ctaLabel,
      isPublished,
    } = req.body;

    if (!headline?.trim()) {
      return res.status(400).json({
        message: "Headline is required",
      });
    }

    const banner = await Banners.create({
      desktopImage,
      mobileImage,
      headline: headline.trim(),
      tagline,
      ctaLabel,
      isPublished: isPublished ?? false,
    });

    return res.status(201).json({
      message: "Banner created successfully",
      banner,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getBanners = async (req, res) => {
  try {
    const banners = await Banners.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Banners fetched successfully",
      banners,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getPublishedBanners = async (req, res) => {
  try {
    const banners = await Banners.findAll({
      where: { isPublished: true },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Published banners fetched successfully",
      banners,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await Banners.findByPk(req.params.id);

    if (!banner) {
      return res.status(404).json({
        message: "Banner not found",
      });
    }

    const {
      desktopImage,
      mobileImage,
      headline,
      tagline,
      ctaLabel,
      isPublished,
    } = req.body;

    const updatedBanner = await banner.update({
      ...(desktopImage !== undefined && { desktopImage }),
      ...(mobileImage !== undefined && { mobileImage }),
      ...(headline !== undefined && { headline }),
      ...(tagline !== undefined && { tagline }),
      ...(ctaLabel !== undefined && { ctaLabel }),
      ...(isPublished !== undefined && { isPublished }),
    });

    return res.status(200).json({
      message: "Banner updated successfully",
      banner: updatedBanner,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banners.findByPk(req.params.id);

    if (!banner) {
      return res.status(404).json({
        message: "Banner not found",
      });
    }

    await banner.destroy();

    return res.status(200).json({
      message: "Banner deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
