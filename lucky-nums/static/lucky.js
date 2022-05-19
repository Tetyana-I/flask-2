/** processForm: get data from form and make AJAX call to our API. */

async function processForm(evt) {
    $("#name-err").text("");
    $("#email-err").text("");
    $("#color-err").text("");
    $("#year-err").text("");
    $("#lucky-results").html("");

    evt.preventDefault();
    try {
        const res = await axios.post('/api/get-lucky-num', {
            "name": $("#name").val(),
            "email": $("#email").val(),
            "year": +$("#year").val(),
            "color": $("#color").val()
        });   
        handleResponse(res.data);
    } catch (err) {
        console.log(err);
    }
}

/** handleResponse: deal with response from our lucky-num API. */

function handleResponse(resp) {
    if (resp.name) {
        $("#name-err").text(resp.name);
    }
    if (resp.email) {
        $("#email-err").text(resp.name);
    }
    if (resp.color) {
        let errors = resp.color[0];
        for (let i=1; i< resp.color.length; i++) {
            errors = errors + " " + resp.color[i];
        }
        $("#color-err").text(errors);
    }
    if (resp.year) {
        let errors = resp.year[0];
        for (let i=1; i< resp.year.length; i++) {
            errors = errors + " " + resp.year[i];
        }
        $("#year-err").text(errors);
    }

    if (resp.num && resp.year) {
        $("#lucky-results").html(`<p> Your lucky number is ${resp.num.num} (${resp.num.fact}).
            <br> Your birth year (${resp.year.year}) fact is ${resp.year.fact}</p>`
        )
    }
}


$("#lucky-form").on("submit", processForm);
