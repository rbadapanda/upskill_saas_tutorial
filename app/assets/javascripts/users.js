
//Document Ready.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');

  //Set Stripe public key.
  Stripe.setPublishableKeya$( $('meta[name="stripe-key"]').attr('content') );

  //When user clicks form submit btn.
  submitBtn.click(function(){
    //prevent default submission behavior.
    event.preventDefault();//anytime someone cliks the 'Sign Up' button, dont submit

    //Collect the credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();

    //Send the card info to Stripe.
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });



  //Stripe will return a card token.
  //Inject card token as hidden field into form.
  //iSubmit form to our Rails app.
});

