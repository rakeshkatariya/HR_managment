// utils.js

// Function to handle errors globally
export const handleFetchErrors = (response) => {
    if (!response.ok) {
        throw new Error('Failed to fetch data.');
    }
    return response;
};

// Function to display a loading spinner
export const showLoadingSpinner = () => {
    // Add code to display a loading spinner
};

// Function to hide the loading spinner
export const hideLoadingSpinner = () => {
    // Add code to hide the loading spinner
};

// Function to download a file
export const downloadFile = async(url, errorHandler = (error) => console.error(error)) => {
    showLoadingSpinner();
    const fileName =  await getFileNameFromUrl(url)
    fetch(url)
        .then(handleFetchErrors)
        .then(response => response.blob())
        .then((blob) => {
            const fileUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = fileUrl;
            a.download = fileName;
            a.click();
        })
        .catch((error) => {
            errorHandler(error);
        })
        .finally(() => {
            hideLoadingSpinner();
        });
};

export const getFileNameFromUrl = async(url) => {
    try {
        const urlObject = new URL(url);
        // Extract the last part of the path as the file name
        const pathSegments = urlObject.pathname.split('/');
        const fileName = pathSegments[pathSegments.length - 1];
        return fileName;
    } catch (error) {
        console.error('Error parsing URL:', error);
        return null;
    }
};