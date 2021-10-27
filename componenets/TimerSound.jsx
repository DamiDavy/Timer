import * as React from 'react'
import { Audio } from 'expo-av'
import Work from './Timer'

export default function TimerSound(props) {
  const [sound, setSound] = React.useState()

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./sounds/little-bird.mp3')
    );
    await sound.playAsync();
    setSound(sound);
  }

  React.useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <Work {...props} playSound={playSound} />
  )
}
