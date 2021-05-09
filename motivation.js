export const renderComplimentButton = function() {
    return `<div style="text-align:center;">
        <button class="button compliment-button" style="position: relative; top: 500px;" >Motivate Me</button>
    </div>
    `
}

export const handleComplimentButtonPress = async function(event) {
    const $root = $('#root');
    const comp = await axios({
        method: 'get',
        /*url: 'https://complimentr.com/api',*/
        url: 'https://insult.mattbas.org/api/insult',
    });
    $(root).append(`<div style="text-align: center; font-size: 36px; position: relative; top: 600px;">
        <h3>${comp.data.insult}</h3>
    </div>`)
}

export  const loadComplimentIntoDOM = async function() {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    $root.append(`<div style="text-align: center; font-size: 36px; position: relative; top: 550px;">
        <a href="./index.html">Clear Motivation</a>
    </div>`)
    $root.append(renderComplimentButton());
    $root.on("click", ".compliment-button", handleComplimentButtonPress);
}

/**
 * Use jQuery to execute the loadTweetsIntoDOM function after the page loads
 */
 $(function() {
    loadComplimentIntoDOM();
});
