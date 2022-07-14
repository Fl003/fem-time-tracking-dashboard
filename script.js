$(document).ready(function () {
    let currentOption = "daily";
    let data = "";

    $.ajax({
        type: "GET",
        url: "data.json",
        dataType: "JSON",
        success: function (response) {
            data = response;
            fillCategories();
        }
    });    

    $(".options li").click(function () { 
        switchOption(this.dataset.option);
    });

    function switchOption(option) {
        if (option == currentOption) return;
        $("li[data-option='" + currentOption + "']").removeClass("active");
        currentOption = option;
        $("li[data-option='" + currentOption + "']").addClass("active");
        fillCategories();
    }

    function fillCategories() {
        $.each($(".categories .card"), function (index, element) {
            $.each(data, function(i, dataset) {
                if($(element).find("h2").text() == dataset.title)
                {
                    let previousText = "";
                    if (currentOption == "daily") {
                        $(element).find(".current").text(dataset.timeframes.daily.current + "hrs");
                        previousText = "Yesterday - " + dataset.timeframes.daily.previous + "hrs";
                    } else if (currentOption == "weekly") {
                        $(element).find(".current").text(dataset.timeframes.weekly.current + "hrs");
                        previousText = "Last Week - " + dataset.timeframes.weekly.previous + "hrs";
                    } else {
                        $(element).find(".current").text(dataset.timeframes.monthly.current + "hrs");
                        previousText = "Last Month - " + dataset.timeframes.monthly.previous + "hrs";
                    }
                    $(element).find(".previous").text(previousText);
                }
            });
        });
    }
});