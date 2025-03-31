{/*import React from 'react'*/}
import { FaUser, FaLink, FaInstagram, FaGithub } from 'react-icons/fa';
import { FaMeta } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer role='contentinfo' className="w-full py-4" style={{ backgroundColor: 'rgba(247, 109, 2, 0.01)' }}>
      {/* perguntar ao time o que colocar aqui */}
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row justify-between space-y-4 md:space-y-0'>
          <div>
            <span className='text-gray-200 font-semibold'>
              <FaUser className="inline mr-2" /> Stay connected with us
            </span> {/* linha feita usando Grok 3 */}
            <div>
              <ul>
                <li>
                  <a target='_blank' rel='noopener noreferrer' href="https://github.com/Diegobbrito" className='text-gray-400 hover:underline'>
                    <FaGithub className="inline mr-2" />Diego Brito
                  </a>
                </li>
                <li>
                  <a target='_blank' rel='noopener noreferrer' href="https://github.com/igormooura" className='text-gray-400  hover:underline'>
                    <FaGithub className="inline mr-2" />Igor Moura
                  </a>
                </li>
                <li>
                  <a target='_blank' rel='noopener noreferrer' href="https://github.com/FelipeTorresHora" className='text-gray-400  hover:underline'>
                    <FaGithub className="inline mr-2" />Felipe Torres
                  </a>
                </li>
                <li>
                  <a target='_blank' rel='noopener noreferrer' href="https://github.com/RamonVeirone" className='text-gray-400  hover:underline'>
                    <FaGithub className="inline mr-2" />Ramon Alves
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <span className='text-gray-200 font-semibold'>
              <FaLink className="inline mr-2" /> Links
            </span>  {/* linha feita usando Grok 3 */}
            <div>
              <ul>
                <li>
                  <a target='_blank' rel='noopener noreferrer' href="https://github.com/ProgramadoresSemPatria/Team3" className='text-gray-400  hover:underline'>
                    <FaGithub className="inline mr-2" /> GitHub Repo
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <span className='text-gray-200 font-semibold'>
              <FaMeta className="inline mr-2" /> Nossa rede
            </span> {/* linha feita usando Grok 3 */}
            <div>
              <ul>
                <li>
                  <a target='_blank' rel='noopener noreferrer' href="https://www.instagram.com/borderlesscoding/" className='text-gray-400  hover:underline'>
                    <FaInstagram className="inline mr-2" /> Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center mt-4'>
        <p className='text-gray-200'>© {new Date().getFullYear()} Team3. Todos os direitos reservados</p>
      </div>
    </footer>
  )
}

export default Footer