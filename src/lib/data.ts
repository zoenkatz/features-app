import { ICrNode, NodeTypes, IModelMetadata } from "./types";

export const features: Array<ICrNode> = [{
    "id": "063ff094-77f1-4d36-80f4-872710f56a2f",
    "attributes": {
        "name": "Cloud Strife",
        "varId": "cloud_strife",
        "description": "Blond EX-SOLDIER guy who carris a giant sword, our hero",
        "type": NodeTypes.FEATURE,
        "domains": [
            "Main Characters"
        ],
        "labels": [
            "SOLDIER",
            "Avalanche"
        ],
        "value": -1
    }
},
{
    "id": "535e01cd-4e04-469a-8132-f5261e24e0a6",
    "attributes": {
        "name": "Tifa Lockhart",
        "varId": "tifa_lockhart",
        "description": "Childhood friend of Cloud, owner of 7th heaven bar, in a love traingle with Cloud and Aerith",
        "type": NodeTypes.FEATURE,
        "domains": [
            "Main Characters"
        ],
        "labels": [
            "Sector 7",
            "Avalanche"
        ],
        "value": -1
    }
},
{
    "id": "ef7dac32-4ef3-40a6-b412-066898716440",
    "attributes": {
        "name": "Aerith Gainsborough",
        "varId": "aerith_gainsborough",
        "description": "Belongs to the Cetra, an ancient race with powerful magical abilities",
        "type": NodeTypes.FEATURE,
        "domains": [
            "Main Characters"
        ],
        "labels": [
            "Cetra",
            "White Mage"
        ],
        "value": -1
    }
},
{
    "id": "c915e7df-c80e-4012-8086-275da7a5e381",
    "attributes": {
        "name": "Yuffie Kisaragi",
        "varId": "yuffie_kisaragi",
        "description": "She is a Ninja and a thief, wielding a large shuriken",
        "type": NodeTypes.FEATURE,
        "domains": [
            "Optional Characters"
        ],
        "labels": [
            "Ninja",
            "Theive",
            "Optional"
        ],
        "value": -1
    }
},
{
    "id": "c672dc44-a3b4-42dc-ad23-b1672e9d4997",
    "attributes": {
        "name": "Vincent Valentine",
        "varId": "vincent_valentine",
        "description": "A former Turk with a mysterious past",
        "type": NodeTypes.FEATURE,
        "domains": [
            "Optional Characters"
        ],
        "labels": [
            "Turks",
            "Handguns",
            "Optional"
        ],
        "value": -1
    }
}];

export const modelMetadata: IModelMetadata = {
    "labels": ["Handguns", "Turks", "Optional", "Theive", "Ninja", "White Mage", "Cetra", "Avalanche", "Sector 7", "SOLDIER", "Avalanche"],
    "domains": ["Optional Characters", "Main Characters"]
};
