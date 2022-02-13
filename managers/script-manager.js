const fs = require('fs');
const child_proccess = require('child_process');

const scripts_desc_path = 'configs/scripts.json';
const scripts_path = 'data/scripts/';


module.exports.get_scripts = () => {
    return JSON.parse(fs.readFileSync(scripts_desc_path));
}

const save_scripts = (scripts) => {
    fs.writeFileSync(scripts_desc_path, JSON.stringify(scripts));
}

module.exports.add_script = (file) => {

    file.mv(`${scripts_path}${file.name}`);

    const script_decriptions = this.get_scripts();

    let type = 'bash';
    if (file.name.includes('.py')) {
        type = 'python';
    } else if (file.name.includes('.js')) {
        type = 'javascript';
    }

    const new_desc = {
        file_name: file.name,
        type
    }

    let ID = 0;
    while (script_decriptions.some(script => script.ID === ID)) ID++; //super temporary fix for generating IDs
    new_desc.ID = ID;

    const replace_ind = script_decriptions.findIndex(script => script.file_name === file.name);

    if (replace_ind === -1) {
        script_decriptions.push(new_desc);
    } else {
        script_decriptions[replace_ind] = new_desc;
    }

    save_scripts(script_decriptions);

}

module.exports.delete_script = (ID) => {

    const saved_scripts = this.get_scripts();

    const del_ind = saved_scripts.findIndex(script => script.ID == ID);
    saved_scripts.splice(del_ind, 1);

    save_scripts(saved_scripts);

}

module.exports.run_script = (ID, args) => {

    const saved_scripts = this.get_scripts();
    const desc = saved_scripts.find(script => script.ID == ID);
    
    if(desc.type === 'python') {
        const proc = child_proccess.spawn('python', [`${scripts_path}${desc.file_name}`].concat(args));
        proc.stdout.on('data', (buffer) => {
            const msg = buffer.toString();
            console.log(`[SCRIPT RUNNER]: ${desc.file_name} -> ${msg}`);
        });
    }

}