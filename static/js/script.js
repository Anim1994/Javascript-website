(function(){
    $(document).ready(function() {
         /* make a model instance and trigger data load */
        window.app.model = new window.app.Jobs()
        window.app.model.getData()

        $(window).on("dataChanged", function() {
            var positions = window.app.model.getPositions()

            for(var i=0; i<10; i++) {

                $("#jobs").append("<li> Title :" + positions[i].title + "<br/>"+"location : " + positions[i].location +"<br/>"+ "Date : " + positions[i].created_at
                 + "<button class = 'details' data-uid=" + positions[i].id + "> see more</button> </li>" + "<p/>");
            }

            /* add a handler for the jobs class to show the details on click */
             $(".details").click(function(){
                var id = this.dataset.uid
                var position = window.app.model.getDetails(id)
                $("#fulldetails").html("<button class = 'close' style = float:right; display:inline-block;  padding:2px 5px;>X</button>"+"<p/>" +"ID :" + position.id + "<p/>"
                + "Time posted :" + position.created_at +
                "<p/>" + "Title :" + position.title + "<p/>" + "Location :"+ position.location
                + "<p/>"+ "Type :" + position.type + "<p/>" + "Description : " + position.description + "<p/>"
                + "how to apply :" + position.how_to_apply + "</p>"
                + "Company :" + position.company + "<p>" + "Website of the company :" + position.company_url + "</p>"
                + '<img src = '  + position.company_logo + ' height = "100" width = "150">' + "</p>" + "url : <a href = >" + position.url + "<a/>" + "<p/>"
                + "Apply for this job by filling the details below" + "<p/>"
                 + "<form id = submission action='/apply' method='POST'> <input name='first_name' placeholder='first name'> <input name='last_name' placeholder='last name'><input name='position_id' placeholder='position id'><input name='years_experience' placeholder='years experience'><input name='expertise' placeholder='expertise'><input type='submit'></form>")

                $("#fulldetails").show();
                $(".close").click(function () {
                    $("#fulldetails").hide();
                })
                $("#submission").submit(function(event){
                 event.preventDefault()
                    $.ajax({
                    type: "POST",
                    url: '/apply',
                    dataType: "json",
                    success:function(data) {
                        $("#fulldetails").html("<p>" + data.message)
                        $('html,body').animate({
                            scrollTop: $("#fulldetails").offset().top},
                            'slow')
                    }
                })
               })
             })

             $("#search").change(function() {
                var count = 0;
                var arrival = $(this).val().toUpperCase();
                var arrival_items = arrival.split(" ");

                $("#jobs").empty();

                // Iterate over each element in the array
                for (var i = 0; i < arrival_items.length; i++){

                    for (var j = 0; j < positions.length; j++) {
                        if (count == 15) {
                            break;
                        }

                        var title = positions[j].title.toUpperCase();
                        title = title.replace(/,/g, " ");
                        title = title.replace(/\\/g, " ");
                        title = title.split('/').join(" ")
                        var title_items = title.split(" ");

                       for (var k = 0; k < title_items.length; k++) {
                            if (title_items[k] == arrival_items[i]) {
                                count++;
                                $("#jobs").append("<li>" + "Title :"+ positions[j].title + "<br/> To apply go here "  + positions[j].url + "</li>" + "<p/>");
                                break;
                            }
                       }
                    }
                }
                              $('html,body').animate({
                            scrollTop: $("#jobs").offset().top},
                            'slow')
             })
        })
    })
})()


