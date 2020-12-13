# Project Walkthrough

This was an interesting project to work on, I haven't worked with video on my previous projects so I had to do things that I wasn't used to. I'm also used to use tools like `Nextjs`, `Gatsby` or any other library that could make the development of my projects easier.

Working fully with React and creating everything from scratch has been a great learning experience.

## Planning and Research Phase

I have started this project by asking a few questions and having some thoughts about it.

- What's the best way to add pictures to the video
  - adding `position: absolute` should do the trick, is there a better way to do it?
- Could setting a state to keep track of video plays help when hiding images after x amount of replays happened?
- Using `controls` inside the `<video>` tag works well, but adding custom controls will allow me to learn more things
- What's the best way to keep track of playing time?
  - Using state?
- Would be good to add keyboard shortcuts like those on Youtube

After I had these questions written down, I decided to start my research. I've used W3Schools and the Mozilla developer docs to learn more about the `<video>` tag and what can be accessed in the DOM.

I've also wanted to add some tests to the project. The open-source library [Video-React](https://video-react.js.org/) has helped me to have some ideas on how and what to test. Looking back I think I should have tested this project further.

### Design

I wasn't sure if keeping the video inside the `<header>` tag was the right thing to do. But since there was that text saying that my App should render there, I have decided to do everything inside this tag.

Having a mockup of the design is always useful, so I have used Abode XD to do a mockup of the design. I've decided to use the colour scheme from Virti and also the pattern svg to give some colour to the background - also to change the background colour when hovering the video player.

![Page Mockup](./public/images/mockup.png)

Color Scheme:

- Dark Blue: `#111b32`
- Light Blue: `#349adc`
- Hover color: `#404859`
- Green: `#46beaf`

## Player

When it comes to having the player working, things went well. The only issue that I had initially was on how to make the player responsive. Initially, I was setting a fixed width in pixels.

After changing that to use the view width, the player can resize properly. I have also added a media query to the player, to make sure that on smaller screens, the video can be seen properly (without using fullscreen).

### Showing Images

The way I went about to show the images at x time played isn't exactly pretty. I'm using a lot of conditionals to check if the played time is the right one to show the image. I'm also keeping track of the times the video has been played.

```js
{
  played > 3.5 && played < 8.5 && counter < 1 && (
    <img className="image-1" src="/images/image1.png" alt="banana" />
  );
}
{
  played > 6 && played < 8 && counter < 3 && (
    <img className="image-2" src="/images/image2.png" alt="remote" />
  );
}
{
  played > 7 && played < 8.5 && counter < 4 && (
    <img className="image-3" src="/images/image3.png" alt="fire" />
  );
}
```

Even though these aren't exactly pretty, it makes the images only to be loaded when all those other conditions are true.

It's also worth to point that I am using seconds instead of milliseconds. Since the images show at the right time, I didn't think there was a point to convert the `currentTime` from the video to milliseconds.

### Getting the video currentTime

To show the images, we need to get the currentTime from the video. Initially, I was using an event listener on `timeupdate` to get an update on the time. But then I realised that I can just use the `onTimeUpdate` attribute in the video tag.

Then the `getCurrentTime` function does two things:

- set the state for `played` time
- increment the counter

```js
const getCurrentTime = () => {
  setPlayed(videoRef.current.currentTime);
  incrementCounter();
};
```

Running increment counter inside this function isn't ideal, but since `incrementCounter` has an if statement that will increase the counter only when a condition is met, I decided to leave it as it is.

### Keeping track of the video plays

This part gave me a bit of trouble. Originally I was just checking if the video `currentTime` was larger than 9 to increase the counter by 1.

The issue here, is that if you make the video loop, the video will restart before it reaches the end - it will go back to the beginning after 9,7000 seconds more or less.

```js
const incrementCounter = () => {
  if (Math.round(videoRef.current.currentTime, 2) > 9) {
    if (loop) {
      setCount(counter + 0.8);
    } else {
      setCount(counter + 0.5);
    }
  }
};
```

Initially, I was using the helper function `getSeconds` to get exact seconds, but that wouldn't work when the loop is active.

The way I found to handle both cases, was to add another if statement and then increment the counter to a decimal point.

The reason behind this is because when the `loop` functionality is active on the video, the loopback would happen at different times.

This means that some times, the counter would be increased by 1 more than once on the same play.

Using the decimal point seem to have fixed the issue. This feels quite hacky and I think there must be a better way to do this.

## Custom controls

These custom controls were the thing that gave me the hardest time. The one thing that is worth to mention straight away is that they didn't work until you have clicked somewhere on the player.

The reason behind this was I was using `getElementById` to get the video player. But by using refs and the right attributes on the video tag, everything is working as expected.

```js
<video
  ref={player}
  id="video-player"
  loop={loop}
  onClick={() => playOrPause(player.current)}
  onTimeUpdate={() => getCurrentTime()}
  onPause={() => videoIsPaused()}
  onPlay={() => videoIsPlaying()}
>
  <source src="/Big_Buck_Bunny_1080_10s_5MB.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

I would also like to mention that this [Custom html5 Video](https://freshman.tech/custom-html5-video/#skip-ahead) article helped me with a lot of the logic behind the controls.

One thing I had some issues with, was on how to get the svgs loaded in the page without using `<img>`, after searching online, I've found this article that helped me - [How to work with svg on react](https://dev.to/raisaugat/how-to-work-with-svg-on-react-4kp4).

Each control has its key shortcut that can be triggered once you have hovered/clicked the player.

- `k` for playing
- `m` for muting
- `l` for loop
- `f` for fullscreen

### Loop

This was possibly the easiest button to create. I set a state (true/false) to the button, on each click it will do the opposite of what the state is set to.

```js
const toggleLoop = () => {
  setLoop(!loop);
};
```

### Fullscreen

The `Element.requestFullscreen()` seems to be widely supported (globally 95%), I decided to just use that to toggle the fullscreen.

```js
const toggleFullscreen = (player) => {
  player.current.requestFullscreen();
};
```

### Play/Pause

This was the first button I started working on and I struggled with it. Initially, I thought about making each button a component, but after working on the play/pause button, I've realised that it would be easier to keep them in the video component.

Initially, I was using a ternary to change the icon depending on the value of the `isPlaying` state.

```js
<button className="player-button" title="Play/Pause (k)" aria-label="Play/Pause (shortcut k)" onClick={() => playOrPause()}>
    { isPlaying === "play" ? <Icon icon="play" width={20} height={23} /> : <Icon icon="pause" width={20} height={23} />}
</button
```

After giving it some more thought, I have decided to approach this problem differently. So I decided that `isPlaying` should be a boolean flag. This allowed me to refactor the above code with:

```js
<button
  className="player-button"
  title="Play/Pause (k)"
  aria-label="Play/Pause (shortcut k)"
  onClick={() => playOrPause(player.current)}
>
  <Icon icon={isPlaying ? "pause" : "play"} width={20} height={23} />
</button>
```

The `playOrPause` function is pretty straightforward, I've created this function because I had to use the same logic when dealing with the keyboard shortcuts.

```js
const playOrPause = (player) => {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
};
```

### Progress bar

There are a lot of things that should be done differently. I've somewhat hardcoded a few things - for example, the duration minutes is always `00`.

I also didn't want to use a `<progress>` tag, because I wanted the bar to look different. So I decided to use divs to create the progress bar. This means that I had to set the `width` to percentages.

```js
<div className="video-progress">
  <div id="progress-bar">
    <div className="progress" style={{ width: `${played * 10}%` }} />
  </div>
</div>
```

Another thing that I thought it could be good to add was the time played and the duration of the video.

I am setting the state of duration on the `videoIsPlaying` function. I had to make this decision after refactoring the whole VideoPlayer component. Setting the duration inside `useEffect` like I had before wouldn't give me undefined.

```js
const [duration, setDuration] = useState("00")
const [played, setPlayed] = useState(0)

const videoIsPlaying = () => {
	setDuration(player.current.duration)
	setIsPlaying(true)
}

//...


<div className="time">
    <time id="time-elapsed">{`00:${getSeconds(played)}`}</time>
    <span> / </span>
    <time id="duration">{`00:${duration}`}</time>
</div
```

Finally, the only thing left to do was allow the user to click the progress bar and make the video skip to that part.

That **Custom html5 video** article helped me a lot when it came to implementing the `updateSeek` function.

Initially, I had my `updateSeek` function like this:

```js
const updateSeek = (event) => {
  const progressBar = document.getElementById("progress-bar").offsetWidth;
  const player = document.getElementById("video-player");

  const skipTo = Math.round(
    (event.offsetX * parseInt(progressBar, 10)) / 10000
  );

  player.currentTime = skipTo;
};
```

Obviously, this is less than ideal. So I decided to add a ref to the progress bar div. By doing that it allows me to remove all of those `document.getElementById` and use the ref instead.

```js
const updateSeek = (event) => {
  const skipTo = Math.round(
    (event.nativeEvent.offsetX *
      parseInt(progressBarRef.current.offsetWidth, 10)) /
      10000
  );
  player.current.currentTime = skipTo;
};

// ...
<div className="video-progress">
  <div id="progress-bar" ref={progressBarRef} onClick={(e) => updateSeek(e)}>
    <div className="progress" style={{ width: `${played * 10}%` }} />
  </div>
</div>;
```

I'd like to mention that the `skipTo` variable, was done by some trial and error. The results aren't exact, but seem to be working well enough.

### Volume

The video didn't have sound, so I decided to skip this since it wouldn't be possible to test. But I would like to mention what I was thinking to do.

- Onclick - would mute the sound with `player.current.muted`
- Slider to update volume level with `player.current.volume = slider.value`

## Tests

Even though the `README` didn't mention anything about creating tests for this project, I thought it could be a good idea to include some.

I've used jest before on an open-source project ([gatsby-remark-embedder](https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=FabioRosado)), but I am still new to testing things in React.

More tests would be good, but I feel I need more practice with jest before I can create more.

## Refactoring

I wasn't entirely happy with what I had written before. This was because I was relying heavily on `document.getElementById`. So I spent some time tidying up the code, the two things that helped was:

- `useRef` on the player and progress bar
- Use JSX attributes on the `<video>` and progress bar div

By removing the `getElementById`, my `useEffect` hook is cleaner. Also, by using the JSX attributes, I have fixed the bug where the keyboard shortcuts weren't working before you click/hover the video player.

## Closing Thoughts

I hope I did a good job explaining my thought process, struggles and decisions that I made when working on this project.

It was really fun working on this and use things that I haven't used before - like the video events for example.

The `README` said that as an additional task, we should change the background when the user hovers and element.

Here I did two things:

- change the icon's background when the user hovers the buttons.
- Change the pattern colour when hovering the player

I hope this meets the requirements. I'm also happy to send a video with the walkthrough of the code if you think I have missed something in this written walkthrough.
