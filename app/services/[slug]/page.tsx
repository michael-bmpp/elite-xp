import { services, getServiceBySlug } from '@/lib/services'
import { notFound } from 'next/navigation'
import ServiceDetailPage from '@/components/ServiceDetailPage'

// Generate static params for all services
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: `${service.label.de} — L'Elite Exclusive Concierge`,
    description: service.description.de,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()
  return <ServiceDetailPage slug={slug} />
}
