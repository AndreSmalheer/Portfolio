export async function includeHTML(containerId, url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Cannot load ${url}: ${response.status}`);
    const html = await response.text();
    document.getElementById(containerId).insertAdjacentHTML("beforeend", html);
  } catch (err) {
    console.error(err);
  }
}

export async function loadCSSFiles(files) {
  files.forEach((file) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = file;
    document.head.appendChild(link);
  });
}

export async function loadHTMLFiles(containerId, files) {
  for (const file of files) {
    await includeHTML(containerId, file);
  }
}
