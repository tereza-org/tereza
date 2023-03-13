import { Flex, Image, Text } from '@ttoss/ui';

export const Navbar = ({
  logo,
  title,
  links,
}: {
  logo: string;
  title: string;
  links: React.ReactNode[];
}) => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 72,
        paddingY: 'md',
        paddingX: ['md', 'md', 'lg'],
        backgroundColor: 'background',
      }}
    >
      <Flex sx={{ gap: 'md' }}>
        <Image src={logo} width={32} height={32} />
        <Text sx={{ fontWeight: 'bold', fontSize: ['base', 'base', 'lg'] }}>
          {title}
        </Text>
      </Flex>
      <Flex
        sx={{
          gap: 'lg',
          fontSize: ['md', 'md', 'md'],
        }}
      >
        {links}
      </Flex>
    </Flex>
  );
};
