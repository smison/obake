{
    "frame": {
        "width": 150,
        "height": 150,
        "rows": 1,
        "cols": 13
    },
    "animations": {
        "normal": {
            "frames": [0, 1, 2, 3, 4, 5, 6, 7],
            "next": "normal",
            "frequency": 3
        },
        "preattack": {
            "frames": [7, 8, 9],
            "next": "attack",
            "frequency": 3
        },
        "attack": {
            "frames": [9, 10, 11, 12],
            "next": "attack",
            "frequency": 4
        },
        "gameover": {
            "frames": [10],
            "next": "gameover",
            "frequency": 3
        }
    }
}
