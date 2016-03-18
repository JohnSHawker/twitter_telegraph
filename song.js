"use strict";

// Tone {
//     playing,
//     duration
// }

// ToneDescription {
//     start
//     attackStop
//     decayStart
//     stop
//     play
// }

var _ = require('lodash')

class Song {
    constructor(tones, fadeTime, sampleRate) {
        this.fadeTime = fadeTime
        this.nextTime = 0
        this.currentTime = 0
        this.perSampleElapsed = 1000 / sampleRate;
        this.bufferFiller = this.bufferFiller.bind(this)
        this.toneDescriptions = []
        this.toneFunc = function() {return 0}
        this.addTones(tones)
    }

    toneToToneDescription(tone, fadeTime) {
        var start = this.nextTime
        var stop = this.nextTime + tone.duration
        var attackStop = Math.min(stop, start + this.fadeTime)
        var decayStart = Math.max(stop, stop - this.fadeTime)
        this.nextTime = stop
        return {
            start:start,
            attackStop:attackStop,
            decayStart:decayStart,
            stop:stop,
            playing: tone.playing
        }
    }

    updateNextTime() {
        this.nextTime = Math.max(this.currentTime, this.nextTime)
    }

    addTone(tone) {
        this.updateNextTime()
        this.toneDescriptions.push(this.toneToToneDescription(tone))
        this.toneFunc = toneFunc(this.toneDescriptions)
    }

    addTones(tones) {
        tones.forEach(function(tone) {
            this.addTone(tone)
        }.bind(this))
    }

    nextY(milliseconds) {
        return this.toneFunc(milliseconds)
    }

    bufferFiller(e) {
        var out = e.buffers;
        for (var i = 0; i < e.bufferSize; i++) {
            // console.log('this', this)
            // console.log(this.nextY(this.currentTime))
            this.currentTime += this.perSampleElapsed
            out[0][i] = this.nextY(this.currentTime)
            console.log('out[0][i]', out[0][i])
        }
    }
}

module.exports = {
    Song:Song
}



function toneFunc(toneDescriptions) {
    // console.log('toneDescriptions', toneDescriptions)
    return function(milliseconds) {
        var description = _.find(toneDescriptions, function(td) {
            return td.start < milliseconds && milliseconds < td.stop
        })
        var stop = (description) ? description.stop : 0
        // console.log("description", milliseconds, stop)
        if (!description) return 0
        if (!description.playing) return 0
        var sineY = Math.sin(2 * Math.PI * milliseconds * 440) * 0.25
        // if (milliseconds < description.attackStop) {
            // console.log((milliseconds - description.start) / (description.attackStop - description.start), milliseconds, sineY * ((milliseconds - description.start) / (description.attackStop - description.start)))
            // return sineY * ((milliseconds - description.start) / (description.attackStop - description.start))
        // }
        // if (milliseconds > description.decayStart) return sineY * ((description.stop - milliseconds) / (description.stop - description.decayStart))
        return sineY * 0.25
        // if (milliseconds < td.attackStop) return

    }


}