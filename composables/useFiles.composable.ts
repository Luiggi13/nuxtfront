export const handleDownload = async (filename: string, downloadFile: string = 'file.pdf') => {
  const response = await fetch('https://storage.googleapis.com/luiggi_pdfs/' + filename);
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  if (!url) return;

  createTagDownload(url, downloadFile)
};

export const createTagDownload = async(href: string, downloadFile: string) => {
  const fileLink = document.createElement('a');
  fileLink.href = href;
  fileLink.setAttribute('download', downloadFile);
  document.body.appendChild(fileLink);
  fileLink.click();
  await new Promise((resolve) => setTimeout(resolve, 100))
  document.body.removeChild(fileLink)
}

export const isPDF = (type: File['type']): boolean => {
  if (type === "application/pdf") {
      return true
  } else {
      return false
  }
}