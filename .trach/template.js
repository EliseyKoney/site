export default ({ markup, helmet }) => {
    return `<!doctype html>
        <html ${helmet.htmlAttributes.toString()}>
            <head >
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                <style>
                    #root {position:absolute;width: 100%;height: 100%;visibility: hidden}
                    .masonry-grid {
                      position: relative;
                    }
                    
                    .masonry-grid .grid-item {
                      position: absolute;
                      transition: top 400ms cubic-bezier(0.455, 0.03, 0.515, 0.955), left 400ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
                    }
        
                </style>
            </head>
            <body ${helmet.bodyAttributes.toString()}>
                <div id="root">${markup}</div>
                <script src="/app.js" async></script>
            </body>
        </html>
`
};
