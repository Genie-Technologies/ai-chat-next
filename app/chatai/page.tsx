import { Metadata } from 'next'
import Chat from './chat'

export const metadata: Metadata = {
    title: 'Chat with ResponAi',
    description: 'Test out the chat',

  }
   
  export default function Page() {
    return <Chat />
  }