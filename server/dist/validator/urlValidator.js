const validateUrl = async (url) => {
    const urlPattern = new RegExp("^(https?:\\/\\/)?" + // protocol
        "([\\da-z\\.-]+)\\.([a-z]{2,})" + // domain
        "([^\\s]*)$" // path
    );
    return urlPattern.test(url);
};
export { validateUrl };
//# sourceMappingURL=urlValidator.js.map