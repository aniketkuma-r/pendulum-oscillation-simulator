export const Theory = ({ LanguageId }: any): string => {
  if (LanguageId === "en") {
    return `<div style="overflow: auto; max-height: 70vh; padding: 0 4px;">
                <h2>Pendulum Motion:</h2>
                <h3>Simple Pendulum:</h3>
                <p>A simple pendulum consists of a mass (called the bob) attached to a string of length <em>l</em> that swings back and forth under the influence of gravity. The motion of the pendulum can be described using the following equations:</p>
                <h3>Equation of Motion:</h3>
                <div class="equation">
                    θ(t) = θ<sub>0</sub>cos(√(g/l) * t + ϕ)
                </div>
                <p>Where:</p>
                <ul>
                    <li>θ(t) is the angular displacement as a function of time</li>
                    <li>θ<sub>0</sub> is the maximum angular displacement (amplitude)</li>
                    <li>G is the acceleration due to gravity</li>
                    <li>l is the length of the pendulum</li>
                    <li>ϕ is the phase constant</li>
                </ul>

                <h3>Energy Conservation:</h3>
                <ul>
                    <li><strong>Potential Energy (PE):</strong>
                        <div class="equation">
                            PE = mgh = mgL(1 - cos(θ))
                        </div>
                    </li>
                    <li><strong>Kinetic Energy (KE):</strong>
                        <div class="equation">
                            KE = ½ mv<sup>2</sup>
                        </div>
                    </li>
                    <li><strong>Mechanical Energy (ME):</strong>
                        <div class="equation">
                            E = KE + PE
                        </div>
                    </li>
                </ul>
                <p>These principles explain how energy is exchanged between kinetic and potential forms as the pendulum swings.</p>

                <h3>Impact of Variables:</h3>
                <ul>
                    <li><strong>Length:</strong> The period T of a simple pendulum is given by:
                        <div class="equation">
                            T = 2π √(l/g)
                        </div>
                    </li>
                    <li><strong>Mass:</strong> The mass of the bob does not affect the period but influences the pendulum’s kinetic energy.</li>
                </ul>

                <h3>Damping due to Air Resistance:</h3>
                <p>Air resistance introduces a damping force proportional to the velocity, which gradually reduces the amplitude of the pendulum’s swing over time.</p>
                <p>The coefficient (Cd) of a sphere can range from 0.07 to 0.5.</p>
                <p>Air resistance, also known as drag, can be calculated using:</p>
                <div class="equation">
                    Fd = ½ ∙ p ∙ v<sup>2</sup> ∙ Cd ∙ A
                </div>
                <p>In this Formula, the following variables are used:</p>
                <ul>
                    <li>Fd: Drag</li>
                    <li>p: Air Density</li>
                    <li>v: Object Velocity</li>
                    <li>Cd: Drag Coefficient</li>
                    <li>A: Object cross-sectional Area</li>
                </ul>
                <p>Air resistance depends on several factors, including the object's velocity, surface area, and Air Density.</p>
                <ul>
                    <li><strong>Velocity:</strong> The faster an object moves through the air, the more air resistance it will experience.</li>
                    <li><strong>Surface Area:</strong> Objects with larger surface area experience more air resistance.</li>
                </ul>
                <p>The unit of Air Resistance is Newton(N).</p>
            </div>`;
  } else {
    return `<div style="overflow: auto; max-height: 70vh; padding: 0 4px;">
            <h2>पेंडुलम गति</h2>
                <h3 class="section-title">सरल पेंडुलम:</h3>
                <p>एक साधारण पेंडुलम में एक द्रव्यमान (जिसे गोलक कहा जाता है) होता है जो लंबाई <em>l</em> की एक स्ट्रिंग से जुड़ा होता है जो गुरुत्वाकर्षण के प्रभाव में आगे और पीछे झूलता है। लोलक की गति को निम्नलिखित समीकरणों का उपयोग करके वर्णित किया जा सकता है:</p>
                <h3 class="section-title">गति का समीकरण:</h3>
                <p class="formula">θ(t) = θ<sub>0</sub>cos(√(g/l) * t + ϕ)</p>
                <p>कहां:</p>
                <ul>
                    <li>θ(t) समय के फलन के रूप में कोणीय विस्थापन है</li>
                    <li>θ<sub>0</sub> अधिकतम कोणीय विस्थापन (आयाम) है</li>
                    <li>g गुरुत्वाकर्षण के कारण त्वरण है</li>
                    <li>l लोलक की लंबाई है</li>
                    <li>φ कला स्थिर है</li>
                </ul>

                <h3 class="section-title">ऊर्जा संरक्षण:</h3>
                <ul>
                    <li><strong>संभावित ऊर्जा (PE):</strong>
                    <p class="formula">PE = mgh = mgL(1 - cos(θ))</p>
                    </li>
                    <li><strong>गतिज ऊर्जा (KE):</strong>
                    <p class="formula">KE = ½ mv<sup>2</sup></p>
                    </li>
                    <li><strong>यांत्रिक ऊर्जा (ME):</strong>
                    <p class="formula">E = KE + PE</p>
                    </li>
                </ul>
                <p>ये सिद्धांत बताते हैं कि पेंडुलम झूलों के रूप में गतिज और संभावित रूपों के बीच ऊर्जा का आदान-प्रदान कैसे होता है।</p>

                <h3 class="section-title">चर का प्रभाव:</h3>
                <ul>
                    <li><strong>लंबाई:</strong> एक साधारण लोलक का आवर्त T निम्न द्वारा दिया गया है:
                    <p class="formula">T = 2π √(l/g)</p>
                    </li>
                    <li><strong>द्रव्यमान:</strong> गोलक का द्रव्यमान अवधि को प्रभावित नहीं करता है लेकिन पेंडुलम की गतिज ऊर्जा को प्रभावित करता है।</li>
                </ul>

                <h3 class="section-title">वायु प्रतिरोध के कारण अवमंदन:</h3>
                <p>वायु प्रतिरोध वेग के समानुपाती एक अवमंदन बल का परिचय देता है, जो धीरे-धीरे समय के साथ पेंडुलम के स्विंग के आयाम को कम करता है।</p>
                <p>गोलक के लिए वायु प्रतिरोध गुणांक (Cd) 0.07 से 0.5 तक हो सकता है।</p>
                <p>वायु प्रतिरोध, जिसे ड्रैग भी कहा जाता है, की गणना निम्नलिखित सूत्र का उपयोग करके की जा सकती है:</p>
                <p class="formula">Fd = ½ ∙ p ∙ v<sup>2</sup> ∙ Cd ∙ A</p>
                <p>इस सूत्र में, निम्नलिखित चर का उपयोग किया गया है:</p>
                <ul>
                    <li>Fd: ड्रैग</li>
                    <li>p: वायु घनत्व</li>
                    <li>v: वस्तु का वेग</li>
                    <li>Cd: ड्रैग गुणांक</li>
                    <li>A: वस्तु का क्रॉस-सेक्शनल क्षेत्रफल</li>
                </ul>
                <p>वायु प्रतिरोध कई कारकों पर निर्भर करता है, जिनमें वस्तु का वेग, सतह क्षेत्रफल और वायु घनत्व शामिल हैं:</p>
                <ul>
                    <li><strong>वेग:</strong> जितनी तेजी से वस्तु वायु में चलती है, उतना ही अधिक वायु प्रतिरोध का सामना करना पड़ता है।</li>
                    <li><strong>सतह क्षेत्रफल:</strong> बड़ी सतह क्षेत्रफल वाली वस्तुओं को अधिक वायु प्रतिरोध का सामना करना पड़ता है।</li>
                </ul>
                <p>वायु प्रतिरोध की इकाई न्यूटन (N) होती है।</p>
            </div>`;
  }
};
