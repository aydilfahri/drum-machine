import React, { useEffect, useState } from 'react';

import './App.css';


const firstSoundsGroup = 
  [
    {
      keyCode: 81,
      key: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    },
    {
      keyCode: 87,
      key: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    },
    {
      keyCode: 69,
      key: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    },
    {
      keyCode: 65,
      key: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    },
    {
      keyCode: 83,
      key: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    },
    {
      keyCode: 68,
      key: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      key: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      key: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      key: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];   

const secondSoundsGroup = [
    {
      keyCode: 81,
      key: 'Q',
      id: 'Chord-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode: 87,
      key: 'W',
      id: 'Chord-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      keyCode: 69,
      key: 'E',
      id: 'Chord-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      keyCode: 65,
      key: 'A',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      keyCode: 83,
      key: 'S',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      keyCode: 68,
      key: 'D',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      keyCode: 90,
      key: 'Z',
      id: 'Punchy-Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      keyCode: 88,
      key: 'X',
      id: 'Side-Stick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      keyCode: 67,
      key: 'C',
      id: 'Snare',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
];



const soundsName: { [key: string]: string } = {
  heaterKit: 'Heater Kit',
  smoothPianoKit: 'Smooth Piano Kit'
};

const soundsGroup: { [key: string]: any[] } = {
  heaterKit: firstSoundsGroup,
  smoothPianoKit: secondSoundsGroup
};

interface Sound {
  keyCode: number;
  key: string;
  id: string;
  url: string;
}

interface KeyboardKeyProps {
  play: (key: string, sound: string) => void;
  deactivateAudio: (audio: HTMLAudioElement) => void;
  sound: Sound;
}

const KeyboardKey: React.FC<KeyboardKeyProps> = ({ play, deactivateAudio, sound }) => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (sound.keyCode === e.keyCode) {
      const audio = document.getElementById(sound.key) as HTMLAudioElement;
      if (audio) {
        play(sound.key, sound.id);
        deactivateAudio(audio);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [sound, play, deactivateAudio]);

  return (
    <button id={sound.keyCode.toString()} className='drum-pad' onClick={() => play(sound.key, sound.id)}>
      {sound.key}
      <audio className='clip' src={sound.url} id={sound.key} />
    </button>
  );
};

interface KeyboardProps {
  sounds: Sound[];
  play: (key: string, sound: string) => void;
  power: boolean;
  deactivateAudio: (audio: HTMLAudioElement) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ sounds, play, power, deactivateAudio }) => (
  <div className="keyboard">
    {power
      ? sounds.map((sound) => (
          <KeyboardKey key={sound.id} sound={sound} play={play} deactivateAudio={deactivateAudio} />
        ))
      : sounds.map((sound) => (
          <KeyboardKey
            key={sound.id}
            sound={{ ...sound, url: '' }}
            play={play}
            deactivateAudio={deactivateAudio}
          />
        ))}
  </div>
);

interface DrumControlProps {
  stop: () => void;
  name: string;
  power: boolean;
  volume: number;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeSoundGroup: () => void;
}

const DrumControl: React.FC<DrumControlProps> = ({ stop, name, power, volume, handleVolumeChange, changeSoundGroup }) => (
  <div className="control">
    <button onClick={stop}>Turn Power {power ? 'OFF' : 'ON'}</button>
    <h2>Volume: {Math.round(volume * 100)}</h2>
    <input
      max="1"
      min="0"
      step='0.01'
      type="range"
      value={volume}
      onChange={handleVolumeChange}
    />
    <h2 id="display">{name}</h2>
    <button onClick={changeSoundGroup}>Change Sounds Group</button>
  </div>
);

const App: React.FC = () => {
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(1);
  const [soundName, setSoundName] = useState('');
  const [soundType, setSoundType] = useState('heaterKit');
  const [sounds, setSounds] = useState<Sound[]>(soundsGroup[soundType]);

  const styleActiveKey = (key: HTMLElement) => {
    key.style.backgroundColor = '#000000';
    key.style.color = '#ffffff';
  };

  const deactivateAudio = (audio: HTMLAudioElement) => {
    setTimeout(() => {
      audio.style.backgroundColor = '#ffffff';
      audio.style.color = '#000000';
    }, 300);
  };

  const play = (key: string, sound: string) => {
    setSoundName(sound);
    const audio = document.getElementById(key) as HTMLAudioElement;
    if (audio) {
      styleActiveKey(audio);
      audio.currentTime = 0;
      audio.play();
      deactivateAudio(audio);
    }
  };

const stop = () => {
    setPower(!power);
  };
  
  const changeSoundGroup = () => {
    setSoundName('');
    if(soundType === "heaterKit"){
        setSoundType("smoothPianoKit");
        setSounds(soundsGroup.smoothPianoKit);
    } else {
        setSoundType("heaterKit");
        setSounds(soundsGroup.heaterKit);
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };
  
  const setKeyVolume = () => {
    const audioes = sounds.map((sound) => document.getElementById(sound.key) as HTMLAudioElement);
    audioes.forEach((audio) => {
      if (audio) {
        audio.volume = volume;
      }
    });
  };

  useEffect(() => {
    setKeyVolume();
  }, [volume, sounds]);

  return (
    <div id="drum-machine" className='container'>
      
      <div className="wrapper">
        <Keyboard sounds={sounds} play={play} power={power} deactivateAudio={deactivateAudio} />
        <DrumControl
          stop={stop}
          power={power}
          volume={volume}
          name={soundName || soundsName[soundType]}
          changeSoundGroup={changeSoundGroup}
          handleVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default App;
