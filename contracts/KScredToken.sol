// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/*
---------------------------- 
 __  __                               ___              __                      ____                                                         
/\ \/\ \                             /\_ \            /\ \                    /\  _`\                                      
\ \ \/'/'    ___     ___   __  __  __\//\ \      __   \_\ \     __      __    \ \,\L\_\  __  __  __     __     _____       
 \ \ , <   /' _ `\  / __`\/\ \/\ \/\ \ \ \ \   /'__`\ /'_` \  /'_ `\  /'__`\   \/_\__ \ /\ \/\ \/\ \  /'__`\  /\ '__`\      
  \ \ \\`\ /\ \/\ \/\ \L\ \ \ \_/ \_/ \ \_\ \_/\  __//\ \L\ \/\ \L\ \/\  __/     /\ \L\ \ \ \_/ \_/ \/\ \L\.\_\ \ \L\ \      
   \ \_\ \_\ \_\ \_\ \____/\ \___x___/' /\____\ \____\ \___,_\ \____ \ \____\    \ `\____\ \___x___/'\ \__/.\_\\ \ ,__/      
    \/_/\/_/\/_/\/_/\/___/  \/__//__/   \/____/\/____/\/__,_ /\/___L\ \/____/     \/_____/\/__//__/   \/__/\/_/ \ \ \/        
                                                                /\____/                                          \ \_\                                           
                                                                \_/__/                                            \/_/  
 ---------------------------- 
*/

// ERC-20 settles
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract ERC20 is Context, IERC20, IERC20Metadata {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }
    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, 0);
        return true;
    }
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, 0);
        _transfer(from, to, 0);
        return true;
    }
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, allowance(owner, spender) + addedValue);
        return true;
    }
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 currentAllowance = allowance(owner, spender);
        require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
        unchecked {
            _approve(owner, spender, currentAllowance - subtractedValue);
        }

        return true;
    }
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(from, to, amount);

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
        }
        _balances[to] += amount;

        emit Transfer(from, to, amount);

        _afterTokenTransfer(from, to, amount);
    }
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
        }
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }
    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            require(currentAllowance >= amount, "ERC20: insufficient allowance");
            unchecked {
                _approve(owner, spender, currentAllowance - amount);
            }
        }
    }
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}
}

contract KnowledgeSwapCredibilityToken is ERC20 {

    address public Owner;
    // The higher the rank the higher the winning reward.
    address[] Rank_A_Solvers;
    address[] Rank_B_Solvers;
    address[] Rank_C_Solvers;

    constructor() 
    ERC20("Knowledge Swap Credibility Token", "KS-CRED") 
    {
        Owner = msg.sender;
    }

    // ERC20 Related Functions 
    function mint(address to, uint amount) external {
        // require(msg.sender == Owner, 'only Owner'); will have an authorsized users systems soon
        
        _mint(to, amount ); // 1000000000000000000 = 1

        // If user surpassed a certain amount of credibility, let him join the reward arrays
        if(balanceOf(to) >= 300 * (10**18)){
            _removeElement(Rank_B_Solvers, to);
            Rank_A_Solvers.push(to);
        } else if(balanceOf(to) >= 100 * (10**18)){
            _removeElement(Rank_C_Solvers, to);
            Rank_B_Solvers.push(to);
        } else if(balanceOf(to) >= 30 * (10**18)){
            Rank_C_Solvers.push(to);
        }

    } 

    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }

    // View credible people
    function getRankASolvers() public view returns(address[] memory){
        return Rank_A_Solvers;
    }
    function getRankBSolvers() public view returns(address[] memory){
        return Rank_B_Solvers;
    }
    function getRankCSolvers() public view returns(address[] memory){
        return Rank_C_Solvers;
    }

    // Helper Method
    function _removeElement(address[] storage _array, address _element) internal {
        for (uint256 i; i<_array.length; i++) {
            if (_array[i] == _element) {
                _array[i] = _array[_array.length - 1];
                _array.pop();
                break;
            }
        }
    }


}