# Word-Guess-Game
https://byronthe123.github.io/Word-Guess-Game/
This is my take on a Hangman game - users are shown blank spaces for each letter to guess in a random word. To start, users must pick a difficulty (easy, med, and hard - affects the length of the word) and enter their names. Users input their guess with the keyboard and the game validates the the input to make sure that:
 - input is an actual letter (no other input is accepted and the user is alerted in the status bar)
 - input is a new guess (the user is alterted if the same letter is guessed again, whether it was a correct or incorrect guess).
 For incorrect guesses, players lose a chance (max 10). If the player guesses the word, the player's score is incremented and carries on into the new round. If the player loses all chances, the game is over and the player's score resets.
 
