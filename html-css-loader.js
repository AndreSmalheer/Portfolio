export async function includeHTML(containerId, url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Cannot load ${url}: ${response.status}`);
    const html = await response.text();

    const container = document.getElementById(containerId);
    container.insertAdjacentHTML("beforeend", html);

    const scripts = container.querySelectorAll("script");
    scripts.forEach((script) => {
      const newScript = document.createElement("script");
      newScript.type = "module";

      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.textContent = script.textContent;
      }
      document.body.appendChild(newScript);
      document.body.removeChild(newScript);
    });
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
