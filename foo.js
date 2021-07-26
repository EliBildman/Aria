

function other() {
    return new Promise((res) => {
        setTimeout(() => {
            res(10);
        }, 5000);
    });
}

function other2() {
    console.log('pog u')
}

async function foo() {
    await console.log(other());

}

(async () => {
    await foo();
    console.log('poggers');
})()

