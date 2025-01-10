/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'urn.realmbullrun.com',
        port: '',
        pathname: '/urn/**',
      },
      {
        protocol: 'https',
        hostname: 'api.realmbullrun.com',
        port: '',
        pathname: '/api/**',
      },    
      {
        protocol: 'https',
        hostname: 'ordinals.com',
        port: '',
        pathname: '/**',
      },    
      // {
      //   protocol: 'https',
      //   hostname: 'api.hiro.so',
      //   port: '',
      //   pathname: '/**',
      // },      
      // {
      //   protocol: 'https',
      //   hostname: 'explorer.ordinalsbot.com',
      //   port: '',
      //   pathname: '/**',
      // },      
    ],
  },
};

export default nextConfig;
