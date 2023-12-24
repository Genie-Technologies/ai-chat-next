'use client'

import { useChat } from 'ai/react';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: `${process.env.NEXT_PUBLIC_API_URL}/ai/chat`,
    });
 
    return (
      <div>
        {messages.map(m => (
          <div key={m.id}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}
   
        <form onSubmit={handleSubmit}>
          <label>
            Say something...
            <input value={input} onChange={handleInputChange} />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }