using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// In WebGL, we need this to receive messages from the React Website
using System.Runtime.InteropServices;

public class CrimeReconstruction : MonoBehaviour
{
    // You will drag your Suspect and Victim characters into these slots in the Unity Editor
    public Animator suspectAnimator;
    public Animator victimAnimator;

    // This makes the function callable from your React Website
    public void PlayCrimeScene(string crimeType)
    {
        Debug.Log("React told Unity to play: " + crimeType);

        if (crimeType == "HOMICIDE")
        {
            // Triggers the "Stab" animation on the suspect
            suspectAnimator.SetTrigger("Stab");
            
            // Triggers the "FallDead" animation on the victim
            victimAnimator.SetTrigger("FallDead");
        }
        else if (crimeType == "ROBBERY")
        {
            // Triggers the "Grab" animation on the suspect
            suspectAnimator.SetTrigger("Grab");
        }
    }
}
