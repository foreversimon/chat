type callback = () => void

interface Ws {
  url: string;
  onOpen?: callback;
  onMessage?: callback;
  onError?: callback;
  onClose?: callback;
}

const port = process.env.PORT || 3000
const base = `ws://${location.hostname}:${port}/`

export default function ({ url, onOpen, onMessage, onClose, onError }: Ws): WebSocket {
  const ws = new WebSocket(base + url)
  const defaultFunction: any = function (...args: any): void { console.log(args) }
  ws.onopen = onOpen || defaultFunction
  ws.onmessage = onMessage || defaultFunction
  ws.onclose = onClose || defaultFunction
  ws.onerror = onError || defaultFunction
  return ws
}
