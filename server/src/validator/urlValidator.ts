const validateUrl = async (url: unknown): Promise<boolean> => {
  if (typeof url !== "string" || !url.trim()) {
    return false;
  }

  try {
    const parsedUrl = new URL(url.trim());
    return (
      (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") &&
      parsedUrl.hostname.length > 0
    );
  } catch {
    return false;
  }
};


export { validateUrl };