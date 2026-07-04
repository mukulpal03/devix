import { LoaderCircle } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SpinnerProps {
  className?: string
}

export const Spinner = ({ className }: SpinnerProps) => (
  <LoaderCircle
    className={cn('h-4 w-4 animate-spin', className)}
    style={{ color: 'var(--text-heading)' }}
    strokeWidth={1.5}
  />
)
