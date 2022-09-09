var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameOn = false;
var level = 0;

function nextSequence()
{
  var randomNumber = Math.floor(Math.random() *4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  for(var i=0; i<2;i++)
  {
    $('#'+randomChosenColor).fadeToggle(100);
    if( i === 0)
    {
      playSound(randomChosenColor);
    }
  }

}

function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $('#' + currentColor).addClass('pressed')
  setTimeout(function() {
  $('#' + currentColor).removeClass('pressed')
}, 100);
}

function checkAnswer(currentLevel, lastIndex)
{
    if (userClickedPattern[lastIndex] != gamePattern[lastIndex])
    {
      level = 0;
      gamePattern = [];
      userClickedPattern = [];

      var audio = new Audio("sounds/wrong.mp3")
      audio.play()
      $('body').addClass('game-over');
      $('h1').text('Game Over, press any key to restart.')
      setTimeout(function() {
      $('body').removeClass('game-over')
    }, 200);
    return false;
    }
    if (lastIndex === currentLevel)
    {
      level = level +1;
      $('h1').text("Level " + level);
      userClickedPattern = [];
      setTimeout(function() {
      nextSequence()
    }, 1000);
    }
    return true;
}

  $('h1').text('Press any key to start.')

  $(document).keypress(function()
  {
    if(!gameOn)
    {
      nextSequence();
      gameOn = true;
      $('h1').text('Level ' + level);
    }

  })

  $('.btn').click(function(e){
    if(gameOn)
    {
      var userChosenColor = e.target.id;
      userClickedPattern.push(userChosenColor);
      var index = userClickedPattern.length - 1;
      gameOn = checkAnswer(level, index);
      playSound(userChosenColor);
      animatePress(userChosenColor);
    }
  })
