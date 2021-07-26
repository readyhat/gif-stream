// import the `Kafka` instance from the kafkajs library
const { Kafka, logLevel } = require("kafkajs")


const { KAFKA_CLIENT_ID, KAFKA_HOST, KAFKA_PORT, KAFKA_TOPIC } = process.env

// the client ID lets kafka know who's producing the messages
const clientId = KAFKA_CLIENT_ID
// we can define the list of brokers in the cluster
const brokers = [([KAFKA_HOST, KAFKA_PORT]).join(':')]
// this is the topic to which we want to write messages
const topic = KAFKA_TOPIC

// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers, logLevel: logLevel.DEBUG })
const producer = kafka.producer({})

// we define an async function that writes a new message 
const produce = async (payload) => {
	await producer.connect()
	let i = 0

	// after the produce has connected, we start an interval timer
		try {
			// send a message to the configured topic with
			// the key and value formed from the current value of `i`
			await producer.send({
				topic,
				acks: 1,
				messages: [
					{
						key: String(i),
						value: payload,
					},
				],
			})

			// if the message is written successfully, log it and increment `i`
			console.log("writes: ", i)
			i++
		} catch (err) {
			console.error("could not write message " + err)
		}
}

module.exports = produce