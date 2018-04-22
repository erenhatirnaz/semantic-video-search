<template>
  <div class="video-details">
    <h1 class="ui dividing header">
      {{ video.segment.value.split('#')[1].trim() }}
    </h1>
    <div class="video">
      <div class="player">
        <video :src="videoSource" controls></video>
      </div>
      <div class="details">
        <div class="table">
          <div class="field">
            <label>Dataset Name:</label>
            <p> {{ video.datasetName.value }} </p>
          </div>
          <div class="field">
            <label>Duration:</label>
            <p> {{ video.segmentDuration.value }} </p>
          </div>
          <div class="field">
            <label>Crowd Densinty:</label>
            <p> {{ video.densityCategory.value.split('#')[1] }} </p>
          </div>
          <div class="field">
            <label>Crowd Movement:</label>
            <p> {{ video.crowdMovement.value.split('#')[1] }} </p>
          </div>
          <div class="field">
            <label>Event Classification:</label>
            <p> {{ video.eventClassification.value.split('#')[1] }} </p>
          </div>
          <div class="field">
            <label>Classification Confidence:</label>
            <p> {{ video.classificationConfidence.value }} </p>
          </div>
        </div>
      </div>
    </div>
    <div class="charts">
      <!-- TODO: pie charts -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoDetails',
  props: {
    video: {
      required: true
    }
  },
  computed: {
    videoSource () {
      const fileName = this.video.segment.value.split('#')[1]

      return `static/videos/${fileName}.mp4`
    }
  }
}
</script>

<style lang="scss" scoped>
.video-details {
  .video {
    display: flex;
    margin-bottom: 15px;

    .player {
      height: 430px;
      background-color: #197bbd;
      padding: 15px;
      border-radius: 15px;

      video {
        height: 100%;
      }
    }

    .details {
      position: relative;
      background-color: #197bbd;
      width: 100%;
      border-radius: 15px;
      padding: 15px;
      margin-left: 15px;

      .table {
        height: 100%;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .field {
          background-color: #fff;
          padding: 5px;
          margin-bottom: 4px;
          border-radius: 10px;

          label {
            font-size: 1.2em;
            font-weight: bold;
            display: block;
            text-decoration: underline;
            text-decoration-color: #197bbd;
          }

          p {
            font-size: 1.5em;
          }
        }
      }
    }
  }

  .charts {
    width: 100%;
    display: flex;
  }
}
</style>
