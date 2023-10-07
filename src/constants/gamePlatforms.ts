export const gamePlatforms: IGamePlatforms = {
    PlayStation: 'PS',
    'PlayStation 2': 'PS',
    'PlayStation 3': 'PS',
    'PlayStation 4': 'PS',
    'PlayStation 5': 'PS',
    'PS Vita': 'PS',
    'Xbox Series S/X': 'XBOX',
    'Xbox 360': 'XBOX',
    'Xbox One': 'XBOX',
    PC: 'PC',
    macOS: 'MAC',
    iOS: 'IOS',
    Linux: 'Linux',
    'Nintendo Switch': 'Switch',
}

interface IGamePlatforms {
    [key: string]: string
}
