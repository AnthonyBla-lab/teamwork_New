export default async function handler(req, res) {
  const { message } = req.body;
  const reply = `You said: "${message}". That's cool!`;
  res.status(200).json({ answer: reply });
}
