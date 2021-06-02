$search_result_box = document.getElementById("search-result-box");
$search_btn = document.getElementById("button-addon2");
$search_place = document.getElementById("search-place");
$filter_places_box = document.getElementById("filter-places-box")
$new_comment_box = document.getElementById("new-comments")
$new_comment_input = document.getElementById("new-comment-input")

var $places_array = [];
var $country_array = [];

for (i = 0; i < 660; i++) {
    $places_array.push(JSON.parse($places)[i].city);
    $country_array.push(JSON.parse($places)[i].country);
}

$search_place.addEventListener("keyup", function () {
    if($search_place.value != "")
    $search_results = searchStringInArray($search_place.value);
    $filter_places_box.innerHTML = ""
    place_box_ui($search_results[$search_results.length - 1])
    if ($search_results[$search_results.length - 2] != $search_results[$search_results.length -1])
        place_box_ui($search_results[$search_results.length - 2])
    if ($search_results[$search_results.length - 3] != $search_results[$search_results.length - 1])
        place_box_ui($search_results[$search_results.length - 3])
    if ($search_results[$search_results.length - 4] != $search_results[$search_results.length - 1])
        place_box_ui($search_results[$search_results.length - 4])
    if ($search_results[$search_results.length - 5] != $search_results[$search_results.length - 1])
    place_box_ui($search_results[$search_results.length - 5])
})

$search_results_array = []
function searchStringInArray(str) {
    str = toTitleCase(str)
    for (var j = 0; j < 660; j++) {
        if ($places_array[j].match(str))
            $search_results_array.push($places_array[j]);
    }
    return $search_results_array;
}

function searchIndexInArray(str) {
    str = toTitleCase(str)
    for (var j = 0; j < 660; j++) {
        if ($places_array[j].match(str))
            return j;
    }
    return $search_results_array;
}

function showResults(view) {
    $html = `<div class="card" style="width: 70vw; margin: 12px auto;">
                <div class="card-body">
                    <h5 class="card-title">${view.innerHTML}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${$country_array[searchIndexInArray(view.innerHTML)]}</h6>
                    <hr>
                    <p class="card-text">
                        <b>Tip: ${$tips[Math.ceil(randomNumber(0, 2))]}</b> <br/>
                        <b> Budget: </b> ${$budgets[Math.ceil(randomNumber(0, 4))]} <br / >
                        <b>Trip of: </b> ${[Math.ceil(randomNumber(2, 4))]} days<br />
                    </p>
                    </div>
            </div>`;
    $search_result_box.innerHTML = $html;
}

function commentHandler() {
    addComment($new_comment_input.value)
}

function addComment(comment) {
    $html = `<div style="padding: 8px; margin: 8px 0 12px 0">
            <div class="name" style="padding-left: 6px"><img src="user.svg" alt="user image" width="25px" height="25px" style="padding-right: 4px;">Anonymous</div>
            <div class="comment" style="padding-left: 38px;">${comment}</div>
            <hr style="margin: 4px" />
        </div>`;
    $new_comment_box.innerHTML += $html
}

function place_box_ui(place) {
    $html = `<div class="card filter-place-box" style="display: inline-block" onClick="showResults(this)">${place}</div>`;
    $filter_places_box.innerHTML += $html;
}

// Function to generate random number  
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function toTitleCase(str) {
    return str.split(/\s+/).map(s => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase()).join(" ");
}