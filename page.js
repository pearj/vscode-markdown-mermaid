import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: false,
    theme: document.body.classList.contains('vscode-dark') || document.body.classList.contains('vscode-high-contrast')
        ? 'dark'
        : 'default'
});

console.error(document.readyState);
console.error(localStorage);

function initMermaid() {
    const storageKey = 'mermaidheights';
    const existingHeights = JSON.parse(localStorage.getItem(storageKey));
    console.error("!!!Mermaid was here with existing: " + JSON.stringify(existingHeights, null, 2));
    let i = 0;
    let heights = {};
    for (let merm of document.querySelectorAll("div.mermaid")) {
        let id = 'mermaid' + i++;
        if (existingHeights && existingHeights[id]) {
            merm.style.height = existingHeights[id];
        }
        try {
            let graph = mermaid.mermaidAPI.render(id, merm.textContent);
            merm.innerHTML = graph;
            // console.log(merm.firstChild.height);
            // console.log(graph);
            // console.log(merm.innerHTML);
            heights[id] = merm.firstChild.height.baseVal.value;
            
        } catch (error) {
            console.error("Failed to render graph", JSON.stringify(error));
        }
    }
    localStorage.setItem(storageKey, JSON.stringify(heights));
    console.error("after save: " + localStorage.getItem(storageKey));
}

// document.addEventListener("DOMContentLoaded", function() {
//     console.error("!!!Joel was here!!!");
// });

if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", initMermaid);
} else if (document.readyState === 'interactive') {
    // DOM is ready!
    initMermaid();
} else {
    // everything is ready!
    initMermaid();
}

console.log(document.body.innerHTML)

// var h1 = document.createElement("h1");
// h1.textContent("Joel");
// document.body.insertBefore(h1, document.body.firstChild);

// setTimeout(() => console.log(document.body.innerHTML), 2000);