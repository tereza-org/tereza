import { Flex, Image, Text } from 'theme-ui';

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
        paddingY: 2,
        paddingX: [3, 3, 4],
        backgroundColor: 'background',
      }}
    >
      <Flex sx={{ gap: 3 }}>
        <Image src={logo} width={32} height={32} />
        <Text sx={{ fontWeight: 'bold', fontSize: [3, 3, 4] }}>{title}</Text>
      </Flex>
      <Flex
        sx={{
          gap: 4,
          fontSize: [2, 3, 3],
        }}
      >
        {links}
      </Flex>
    </Flex>
  );
};
