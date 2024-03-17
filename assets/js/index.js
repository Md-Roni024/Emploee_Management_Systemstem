


$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}
// if(window.location.pathname == "/"){
//     $onblock = $(".table tbody td a.block");
//     $onblock.click(function(){
//         var id = $(this).attr("data-id")

//         var request = {
//             "url" : `http://localhost:3000/api/users/block/${id}`,
//             "method" : "PATCH"
//         }

//         if(confirm("Do you really want to take action?")){
//             $.ajax(request).done(function(response){
//                 alert("Successfull!");
//                 location.reload();
//             })
//         }

//     })
// }

if(window.location.pathname == "/") {
    $onblock = $(".table tbody td button.block");
    $onblock.click(function() {
        var id = $(this).attr("data-id");
        var status = $(this).attr("data-status");

        var request = {
            "url" : `http://localhost:3000/api/users/block/${id}`,
            "method" : "PATCH"
        }

        if(confirm("Do you really want to take action?")){
            $.ajax(request).done(function(response){
                alert("Successful!");
                location.reload();
            });
        }
    });
}
