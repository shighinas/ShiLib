$(document).ready(function(){    
    $('#hide').click(function(){
        $('.signUp').animate({left: '500px', width: 'toggle'},'slow', ()=>{
            $('.shig').toggle();
            $('.hidden').toggle();
        });
    });
    $('#hide2').click(function(){
        location.reload();
    });

    // sign in validation
    $('#user').on('submit', ()=>{
        if( $('#useremail').val()=="admin@admin.com" && $('#userpass').val()=="12345"){
            return true;
        }
        else {
            alert("Incorrect Username or password ");
            location.reload();
            return false;
        }
    });


    // sign Up validation
    
    $('#reg').on('submit', ()=>{
        var name = $('#regname').val();
        var legalname = new RegExp('^[a-zA-Z]+$');
        var mail = $('#regemail').val();
        var phoneVal = $('#regnum').val();
        var phone = new RegExp('^[0-9]{10}$');
        var passVal = $('#regpass').val();
        var passconfirm = $('#regconfirm').val();
        if(name=='' || mail=='' || phoneVal=='' || passVal=='' || passconfirm==''){
            alert("All fields are required.");
            return false;
        }
        else if(name.length < 3 || !(legalname.test(name))){
            alert("Username needs to be atleast 3 characters and only letters are allowed");
            return false;
        }
        else if(!(phone.test(phoneVal))){
            alert("Please provide a valid phone number.")
            return false;
        }
        else if(passVal.length < 8){
            alert("Password must contaion atleast 8 charachters");
            return false;
        }
        else if(passVal != passconfirm) {
            alert("Confirm password field must match with the password field.");
            return false;
        }
        else {
            console.log("Client validation done, redirected to server.")
            return true;
        }
    })

    
});