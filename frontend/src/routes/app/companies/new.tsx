import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/companies/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/companies/new"!</div>
}
