# KAHNvert

A distributed media conversion system using ffmpeg and written in Node.js.

This project was inspired by my experience with [FileFlows](https://github.com/revenz/FileFlows) and [Unmanic](https://github.com/Unmanic/unmanic). After many, many hours I was able to get both setup _really_ close to what I wanted, but I could never get either to be perfect.

_That's NOT a dig on either project_—they're both awesome! I'm just a control freak and didn't want to be limited by number of processing nodes. Plus, I needed a practical project to further my Node.js knowledge and as a portfolio piece.

KAHNvert is a mashup of the word "convert" (as in the noun meaning "someone who has converted") and the emotion of Captain Kirk yelling out "KAAAAAAAAAHN!" in absolute frustration when I couldn't get things working with FileFlows or Unmanic exactly as I wanted. _(Again, that's my impatience and neurodivergent need for control—they are both great projects and a million times more mature than this project will likely ever be!)_

KAHNvert is built on a client/server model:

- The server tracks conversion tasks in a MongoDB database
- The clients pull tasks from the server (via REST API) and do the actual conversion (by running ffmpeg locally)

_This is a work in progress! I'm currently working on the API. Once it's finished I will implement library scanning, then the actual processing with ffmpeg on client nodes._

## How It Works (or will work)

1. Libraries are setup in the server config
2. Server scans library folders for files and adds them to the task list
3. Worker nodes request `[n + 1]` tasks from server via REST API
   - _where `[n]` is the number of preloaded tasks configured_
4. Tasks are then marked as assigned to the requesting node
5. Worker nodes start copying task files from the library to local temporary directory for processing
6. Once the file for the first task finishes copying, ffmpeg is run
   - _files for any additional pre-loaded tasks will continue copying while ffmpeg is running_
7. Output from ffmpeg is sent to server (via REST) as well as logged to stdout on processing node
8. Status of task is also updated via REST
9. If the task fails, an error is logged locally and in the task log (via REST)
10. On task completion (whether successful or not), the next task is loaded and the process repeats until no more tasks are remaining

---

## API Documentation

### Retrieving task information

#### GET /api/v1/tasks

Returns all tasks from database.

Defaults to selecting tasks where status !== "deleted" (as these are considered deleted).

Optional URL parameters:

- libraryId: MongoDB ObjectID; _filters tasks by library_
- status: String; _filters tasks by status_

Note: To retrieve tasks regardless of status, set status = "any" in the URL parameters.

#### GET /api/v1/tasks/:taskId

Returns a specific task.

Defaults to selecting tasks where status !== "deleted" (as these are considered deleted).

To retrieve task regardless of status, set status = "any" in the URL parameters.

#### GET /api/v1/tasks/:taskId/log

Returns all log entries for task.

---

### Creating new tasks

#### POST /api/v1/tasks/:taskId

Inserts new task.

_More documentation coming._

---

### Updating tasks

#### PUT /api/v1/tasks/:taskId

Updates task.

_More documentation coming._

#### PUT /api/v1/tasks/:taskId/log

Adds log entry for task.

_Not supported yet._

---

### Deleting tasks

_Not supported yet._

---

### Retrieving library information

#### GET /api/v1/libraries

Gets all libraries from database.

_Not supported yet._

#### GET /api/v1/libraries/:libraryId/tasks

Gets all tasks for library.

Defaults to selecting tasks where status !== "deleted" (as these are considered deleted).

_Not supported yet._

---

### Creating new libraries

_Not supported yet._

---

### Updating libraries

_Not supported yet._

---

### Deleting libraries

_Not supported yet._

---

---

## Document Schemas

### TaskSchema

- **status:** String; One of pending, assigned, processing, complete, missing, failed, or deleted; _defaults to "pending"_
- **filename:** String; The name of the file to be processed
- **inputData:** [VideoInfoSchema](#videoinfoschema); Object containing information about the input video file
- **outputData:** [VideoInfoSchema](#videoinfoschema); Object containing information about the output video input file after processing
- **assignedNode:** String; The name of the processing node assigned to the task
- **startedAt**: Date; time when task was started
- **progress**: Number; percentage of progress; _defaults to 0_
- **endedAt** Date; time when task finished (whether successful or not)
- **log:** Array<[TaskLogSchema](#tasklogschema)>; Array of objects containing log information

### VideoInfoSchema

- **streamCount:** Number; the number of streams
- **format:** String; the format of the video
- **formatLongName:** String; the long name of the video format
- **duration:** Number; the duration of the video in seconds
- **bitrate:** Number; the bitrate of the video
- **size:** Number; the file size
- **videoStreams:** Array<[VideoStreamSchema](#videostreamschema)>; array of video streams
- **audioStreams:** Array<[AudioStreamSchema](#audiostreamschema)>; array of audio streams

### AudioStreamSchema

- **index** Number; original index of the stream
- **codecName** String; audio codec name
- **codecLongName** String; long name of audio codec
- **profile** String; audio stream codec profile
- **channels** Number; number of channels in stream
- **channelLayout** String; channel layout (e.g.: 5.1 or stereo)
- **sampleRate** String; audio stream sample rate
- **bitrate**: String; bitrate of the audio
- **maxBitrate** String; maximum bitrate of the audio
- **title** String; title of the audio stream

### VideoStreamSchema

- **index**: Number; original index of the stream
- **codecName**: String; video codec
- **codecLongName**: String; long name of the video codec
- **profile**: String; video profile
- **pixelFormat**: String; video pixel format
- **framerate**: String; video stream framerate
- **bitrate**: String; video stream bitrate
- **maxBitrate**: String; maximum video bitrate
- **aspectRatio**: String; video stream aspect ratio
- **width**: Number; video stream width
- **height**: Number; video stream height
- **title**: String; title of the video stream

### TaskLogSchema

- **timestamp:** Date; timestamp of the log entry
- **message:** String; message of the log entry
