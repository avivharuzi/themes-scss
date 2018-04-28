const changeCase = require('change-case');
const fs = require('fs');

fs.readdir('./themes', (err, files) => {
    if (err) {
        throw err;
    } else {
        files.forEach((filename) => {
            let colors = require(`./themes/${filename}`);
            let themeNameWithout = filename.split('.json')[0]
            let themeName = filename.split('-theme.json')[0];

            let data = `/*----------  ${changeCase.titleCase(themeNameWithout)}  ----------*/\n\n`;

            for (let color of colors) {
                let v = `$${changeCase.paramCase(color.name)}: ${color.hex};\n`
                data += v;
            }

            createColorsFile(themeName, data);
        });
    }
});

function createColorsFile(themeName, data) {
    fs.writeFile(`./src/scss/_${themeName}.scss`, data, (err, data) => {
        if (err) {
            throw err;
        }
    });
}
