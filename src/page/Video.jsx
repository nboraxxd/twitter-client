import { Controls, Gesture, MediaPlayer, MediaProvider, Time } from '@vidstack/react'

import * as Buttons from '@/components/button'
import * as Menus from '@/components/menus'
import * as Sliders from '@/components/sliders'

/** 👉 We're only scratching the surface here! */

export default function Video() {
  return (
    <MediaPlayer
      title="..."
      src="http://localhost:3000/static/stream-hls-video/L9CItQRfVFTeYRisa141v/master.m3u8"
      aspectRatio="16/9"
      // http://localhost:3000/static/stream-hls-video/EJHJkvPjYAsJWOyqt9PG8
    >
      <MediaProvider />

      {/* <image
        className="absolute inset-0 w-full h-full z-0 opacity-100 media-started:opacity-0 transition-opacity"
        src="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
        alt="..."
        placeholder="blur"
      /> */}

      {/* <Caption.Root className="absolute flex flex-col inset-0 w-full h-full z-30 items-end justify-center">
        <Caption.Text className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-lg lg:text-xl" />
      </Caption.Root> */}

      <Controls.Root className="absolute inset-0 flex flex-col w-full h-full z-10 opacity-0 transition-opacity media-controls:opacity-100">
        <Controls.Group className="w-full flex items-center px-2 py-1">
          <div className="flex-1" />
          <Menus.Settings />
        </Controls.Group>

        <div className="flex-1" />

        <Controls.Group className="flex items-center px-2 py-1 w-full">
          <Sliders.Time />
        </Controls.Group>

        <Controls.Group className="w-full flex items-center px-2 py-1 space-x-2">
          <Buttons.Play />
          <Buttons.Mute />
          <Sliders.Volume />
          <TimeProgress />
          <div className="flex-1" />
          <Buttons.Caption />
          <Buttons.PIP />
          <Buttons.Fullscreen />
        </Controls.Group>
      </Controls.Root>

      <Gesture className="absolute inset-0" event="pointerup" action="toggle:paused" />
      <Gesture className="absolute inset-0" event="pointerup" action="toggle:controls" />
      <Gesture className="absolute inset-0 z-10" event="dblpointerup" action="toggle:fullscreen" />
      <Gesture className="absolute top-0 left-0 w-1/5 h-full z-20" event="dblpointerup" action="seek:-10" />
      <Gesture className="absolute top-0 right-0 w-1/5 h-full z-20" event="dblpointerup" action="seek:10" />
    </MediaPlayer>
  )
}

function TimeProgress() {
  return (
    <div className="flex items-center text-sm text-white">
      <Time type="current" />
      <div className="mx-px">/</div>
      <Time type="duration" />
    </div>
  )
}
