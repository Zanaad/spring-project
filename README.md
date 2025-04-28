## Exercise 3.06: DBaaS vs DIY Comparison

| Aspect | DBaaS (Cloud SQL) | DIY (Self-Hosted Postgres on GKE) |
|:------|:------------------|:-------------------------------|
| **Setup Time** | Very quick (few clicks / Terraform). | More manual (Deployment, Service, PVCs, etc). |
| **Cost** | Higher (pay for managed service, backups, maintenance). | Lower direct cost, but more manual work. |
| **Maintenance** | Automatic patches, updates, monitoring. | Manual responsibility for updates and monitoring. |
| **Backups** | Automatic snapshots, easy restores. | Manual backups (e.g., cronjobs, `pg_dump`). |
| **Scalability** | Easy (resize instance). | Harder (resize PVCs, manage StatefulSet). |
| **High Availability** | Built-in options available. | Must be configured manually. |
| **Performance** | Optimized by provider. | Depends on GKE configuration. |
| **Security** | Managed encryption, SSL, IAM. | Must configure manually. |
| **Control** | Less flexibility. | Full flexibility over configuration. |
| **Risk** | Very low. | Higher risk (requires expertise). |

### Conclusion

Using DBaaS like Google Cloud SQL provides faster setup, easier maintenance, built-in backups, high availability, and managed security at the cost of higher pricing.  
DIY self-hosted solutions offer full control and potentially lower costs, but require significant manual work for setup, scaling, security, maintenance, and backups.  
For production environments, DBaaS is generally preferred.  
For development, learning, and cost-sensitive projects, DIY hosting inside Kubernetes is an excellent exercise.
