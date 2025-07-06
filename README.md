# Talkemon

> _"What if your meetings could actually be... intelligent?"_

**Talkemon** is a real-time AI agent video calling platform that turns boring meetings into engaging conversations. Train custom AI agents, drop them into video calls, and watch them participate like actual team members.

## What Does It Do?

- **Custom AI Agents**: Create agents with unique personalities and expertise
- **Real-time Video Calls**: AI agents join, participate, and contribute meaningfully
- **Smart Transcriptions**: Every word captured with speaker identification
- **Intelligent Summaries**: AI-powered meeting notes that actually make sense
- **Post-Meeting Chat**: Continue conversations with your AI agents
- **Auto-Generated Avatars**: Visual personalities for your digital teammates

## Quick Start

```bash
# Clone the magic
git clone https://github.com/yourusername/talkemon.git
cd talkemon

# Install dependencies
npm install

# Set up your environment
cp .env.example .env
# Fill in your API keys (you know the drill)

# Generate the database
npx drizzle-kit push

# Start the chaos
npm run dev
```

## Tech Stack (for the nerds)

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: Better Auth with Polar integration
- **Video**: Stream.io for real-time video calls
- **AI**: OpenAI GPT-4 with custom agent system
- **Background Jobs**: Inngest for meeting processing
- **Payments**: Polar for subscription management

## Example Prompts

- _"Create a Physics Professor who explains everything with food analogies"_
- _"Build a Sarcastic Meeting Facilitator who keeps everyone on track"_
- _"Make a Creative Director who brainstorms wild ideas"_
- _"Design a Technical Reviewer who spots every bug"_

## How It Works

1. **Create**: Design your AI agent with custom instructions
2. **Schedule**: Set up a meeting and invite your agent
3. **Connect**: Join the video call with your AI teammate
4. **Collaborate**: Watch your agent participate naturally
5. **Review**: Get transcripts, summaries, and continue chatting

## Project Structure

```
src/
├── app/
├── components/
├── modules/
│   ├── agents/
│   ├── meetings/
│   ├── call/
│   └── premium/
├── inngest/
├── trpc/
└── lib/
```

## Features

- **Agent Management**: Create, edit, and manage AI personalities
- **Meeting Scheduler**: Plan calls with AI participation
- **Live Video Calls**: Real-time video with AI agents
- **Transcript Search**: Find any conversation moment
- **Meeting Analytics**: Track duration, participation, and insights
- **Premium Tiers**: Unlimited agents and meetings

## License

MIT License - Go wild, build amazing things!

---

_Built with love and excessive amounts of caffeine_
