interface StatusAnnouncementProps {
  message: string | null
}

export default function StatusAnnouncement({ message }: StatusAnnouncementProps) {
  if (!message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="sr-only"
    >
      {message}
    </div>
  )
} 