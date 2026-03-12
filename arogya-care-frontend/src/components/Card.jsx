import { motion } from 'framer-motion';

export function Card({ children, className = '', hover = false, animated = false, delay = 0, ...props }) {
  const Wrapper = animated ? motion.div : 'div';
  const animProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay, ease: 'easeOut' },
      }
    : {};

  return (
    <Wrapper
      className={`glass-card rounded-2xl ${
        hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300 card-premium' : ''
      } ${className}`}
      {...animProps}
      {...props}
    >
      {children}
    </Wrapper>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`px-6 py-4 border-b border-gray-100/50 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = '' }) {
  return <div className={`px-6 py-5 ${className}`}>{children}</div>;
}

export function StatCard({ icon: Icon, label, value, change, status, gradient, className = '' }) {
  const statusColors = {
    normal: 'text-secondary bg-secondary/10',
    elevated: 'text-warning bg-warning/10',
    overweight: 'text-warning bg-warning/10',
    critical: 'text-danger bg-danger/10',
    good: 'text-secondary bg-secondary/10',
  };

  return (
    <Card hover className={className}>
      <CardBody>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">{label}</p>
            <p className="text-2xl font-extrabold text-gray-900 mt-1">{value}</p>
            {change && <p className="text-xs text-secondary font-semibold mt-1.5">{change}</p>}
          </div>
          <div className="flex flex-col items-end gap-2">
            {Icon && (
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-md ${
                gradient ? `bg-gradient-to-br ${gradient} shadow-primary/15` : 'bg-primary/10'
              }`}>
                <Icon className={`w-5 h-5 ${gradient ? 'text-white' : 'text-primary'}`} />
              </div>
            )}
            {status && (
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[status] || 'text-gray-500 bg-gray-100'}`}>
                {status}
              </span>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
