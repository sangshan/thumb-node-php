axios.defaults.baseURL = 'http://localhost:3000';
axios.get('/get')
  .then(function (response) {
      $('.count').text(response.data.count)
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
});
$('.thunb').on('click', function(){
    throttle(add)
})
function throttle(method) {
    clearTimeout(method.time);
    method.time = setTimeout(function () {
        method();
    }, 1000);
}
function add(){
    axios.get('/add')
    .then(function (response) {
        $('.count').text(response.data.count)
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}