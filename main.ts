function close () {
    for (let servo1 = 0; servo1 <= 70; servo1++) {
        let servo12 = 0
        pins.servoWritePin(AnalogPin.P0, 70 - servo12)
        basic.pause(20)
    }
}
function open2 () {
    for (let servo1 = 0; servo1 <= 70; servo1++) {
        pins.servoWritePin(AnalogPin.P0, servo1)
        basic.pause(20)
    }
}
let counter = 0
let limit = 600
let moisture = pins.analogReadPin(AnalogPin.P1)
while (true) {
    moisture = pins.analogReadPin(AnalogPin.P1)
    led.setBrightness(20)
    led.plotBarGraph(
    moisture,
    1024
    )
    if (moisture < limit) {
        while (counter <= 4 && moisture < limit) {
            counter += 1
            open2()
            close()
            basic.pause(2000)
            moisture = pins.analogReadPin(AnalogPin.P1)
        }
    } else {
        counter = 0
    }
    if (counter == 5) {
        music.startMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once)
        basic.showString("KONCHILAS VODA!!!")
        break;
    }
    if (input.buttonIsPressed(Button.A)) {
        basic.clearScreen()
        basic.showString("" + moisture)
    }
}
